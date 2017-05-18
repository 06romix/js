define(['./Abstract'], function (Abstract) {
  function Arena(army) {
    var self = this;
    self._arena = null;
    self._arenaNav = null;
    self.blue = army.blue;
    self.red = army.red;
    self.redPlayer = null;

    self.init = function() {
      window.start = self.start.bind(self);
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
        while (++r <= 7) {
          var c = 0;
          var tr = document.createElement('tr');
          while (c <= 9) {
            var td = document.createElement('td');
            td.setAttribute('id', r + '' + c);
            tr.appendChild(td);
            c++;
          }
          table.appendChild(tr);
        }

        table.onclick = function(event) { // set onclick function
          var target = event.target;

          switch (target.tagName) {
            case 'TD':
              self.move(target);
              break;
            case 'IMG':
              var targetInfo = self.getInfoByDiv(target.parentNode.parentNode);
              if (targetInfo.side == 'blue') {
                self.blue.selectUnit(target);
              } else {
                self.attack(targetInfo);
              }
              break;
          }
        };

        self._arena.appendChild(table);
        // arena fill
        self.prepareArena(self.blue);
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

  Arena.prototype = Object.create(Abstract.prototype);

  Arena.prototype.getButton = function () {
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
  };

  Arena.prototype.move = function (target) {
    if (!window.inBattle) {
      if (target.tagName == 'TD' && !target.hasChildNodes() && window.currentUnit.blue) {
        window.currentUnit.blue.move(target.getAttribute('id'));
      }
    } else {
      if (window.currentUnit.blue) {
        var position = target.getAttribute('id');
        if (!target.hasChildNodes()) {
          window.currentUnit.blue.move(position);
        }
      } else {
        console.log('-');
      }
    }
  };

  Arena.prototype.attack = function (targetInfo) {
    var unit = this.red.units[targetInfo.id];
    if (window.currentUnit.blue) {
      window.currentUnit.blue.attack(unit);
    }
    this.checkArmy();
  };

  Arena.prototype.checkArmy = function () {
    var anyoneAlive = false;
    console.log(this.red);
    this.red.units.forEach(function (unit) {
      if (unit.alive()) {
        anyoneAlive = true;
      }
    });
    if (!anyoneAlive) {
      this.endGame();
    }
  };

  Arena.prototype.endGame = function () {
    setTimeout(function () {
      alert('Victory');
      location.reload();
    }, 300);
  };

  Arena.prototype.prepareArena = function (army) {
    army.units.forEach(function (unit) {
      if (unit.pos()) {
        console.log(unit.pos());
        var td = this._arena.querySelector('td[id="' + unit.pos() + '"]');
        if (td && !td.hasChildNodes()) {
          td.appendChild(unit.toHtml());
        } else {
          console.error('td has child, id: ' + td.getAttribute('id'));
        }
      }
    }, this);
  };

  Arena.prototype.start = function () {
    console.log('start');
    this.showRedArmy();
    this.blue.removeArmyList();
    window.inBattle = true;
    document.getElementsByClassName('start')[0].remove();
  };

  Arena.prototype.showRedArmy = function () {
    if (this.redPlayer) {
      this.prepareArena(this.red);
    }
  };

  return Arena;
});