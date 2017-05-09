define(function () {
  function Arena(army) {
    var self = this;
    self._arena = null;
    self.blue = army.blue;
    self.red = army.red;

    self.init = function() {
      var a = document.querySelector('#arena-holder > article');
      if (typeof a === 'object' && a !== null && a.hasChildNodes()) {
        console.log('Arena already exists!');
        self._arena = a;
      } else {
        self._arena = document.createElement('div');
        self._arena.className = 'wrapper';
        // nav
        self._arena.appendChild(self.getNav());
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

          if (target.tagName != 'TD') return;

          self.doSomething(target);
        };

        self._arena.appendChild(table);
        // army list
        self._arena.appendChild(self.blue.getArmyList());
      }
    };

    self.getArena = function () {
      if (!self._arena) {
        self.init();
      }
      return self._arena;
    };
  }

  Arena.prototype = {
    getNav: function () {
      var nav = document.getElementById('#btns');
      if (nav === null) {
        nav = document.createElement('nav');
        nav.className = 'right';

        var btn = document.createElement('button');
        nav.appendChild(btn);
      }
      return nav;
    },

    doSomething: function (target) {
      if (window.currentUnit.blue) {
        var position = target.getAttribute('id');
        if (target.hasChildNodes()) {
          var unit = this.getUnitByPosition(target.getAttribute('id'));
          if (unit.getSide() === window.side) {
            if (window.currentUnit.canBuff()) {
              window.currentUnit.buff(unit); // Buff unit
            }
          } else {
            window.currentUnit.attack(unit);
          }
        } else {
          window.currentUnit.move(position);
        }
      } else {
        console.log('-');
      }
    },

    getUnitByPosition: function (position) {

    }
  };

  return Arena;
});