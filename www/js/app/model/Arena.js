define(function () {
  function Arena(army) {
    var self = this;
    self._arena = null;
    self._arenaNav = null;
    self.blue = army.blue;
    self.red = army.red;

    self.init = function() {
      window.start = self.start;
      var a = document.querySelector('#arena-holder > article');
      self._arenaNav = self.getButton(); // arena navigation
      if (typeof a === 'object' && a !== null && a.hasChildNodes()) {
        console.log('Arena already exists!');
        self._arena = a;
      } else {
        self._arena = document.createElement('div');
        self._arena.className = 'wrapper';
        // arena field
        var table = document.createElement('table');
        table.setAttribute('id', 'arena');
        var r = 0;
        while (++r <= 5) {
          var c = 0;
          var tr = document.createElement('tr');
          while (++c <= 8) {
            var td = document.createElement('td');
            td.setAttribute('id', r + '' + c);
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }
        table.onclick = function(event) {
          var target = event.target;

          switch (target.tagName) {
            case 'TD':
              self.doSomething(target);
              break;
            case 'IMG':
              self.blue.selectUnit(target, self.blue.units);
              break;
          }
        };

        self._arena.appendChild(table);
        // arena fill
        self.prepareArena();
        // army list
        self._arena.appendChild(self.blue.getArmyList());
      }
    };

    self.getArena = function () {
      if (!self._arena || self._arenaNav) {
        self.init();
      }
      return {arena: self._arena, nav: self._arenaNav};
    };
  }

  Arena.prototype = {
    getButton: function () {
      if (this._arenaNav === null) {
        var btn = document.createElement('button');
        btn.className = 'start';
        btn.innerText = 'Start';
        btn.onclick = function () {
          var army = document.getElementById('army-list');
          if (!army.hasChildNodes() || confirm('Don\'t use all units?')) {
              window.start();
          }
        };
        this._arenaNav = btn;
      }
      return this._arenaNav;
    },

    doSomething: function (target) {
      if (!window.inBattle) {
        if (target.tagName == 'TD' && !target.hasChildNodes() && window.currentUnit.blue) {
          window.currentUnit.blue.move(target.getAttribute('id'));
        }
        console.log(target);
      } else {
        if (window.currentUnit.blue) {
          var position = target.getAttribute('id');
          if (target.hasChildNodes()) {
            var unit = this.getUnitByPosition(target.getAttribute('id'));
            if (unit.getSide() === window.side) {
              if (window.currentUnit.blue.canBuff()) {
                window.currentUnit.blue.buff(unit); // Buff unit
              }
            } else {
              window.currentUnit.blue.attack(unit);
            }
          } else {
            window.currentUnit.blue.move(position);
          }
        } else {
          console.log('-');
        }
      }
    },

    getUnitByPosition: function (position) {

    },

    prepareArena: function () {
      this.blue.units.forEach(function (unit) {
        if (unit.pos()) {
          var td = this._arena.querySelector('td[id="' + unit.pos() + '"]');
          if (td && !td.hasChildNodes()) {
            td.appendChild(unit.toHtml());
          }
        }
      }, this);
    },

    start: function () {
      console.log('start');
    }
  };

  return Arena;
});