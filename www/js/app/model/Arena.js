/**
 * @module model/Arena
 */
define(['./Abstract', './Army'], function (Abstract, Army) {
  class Arena extends Abstract {
    constructor(army) {
      super();
      this._arena     = null;
      this._arenaNav  = null;
      this.blue       = army.blue;
      this.red        = army.red;
      this.redPlayer  = null;
      this.TimeLine   = null;
      this.queue      = null;
    }

    init() {
      window.start = this.start.bind(this);
      let a = document.querySelector('#arena-holder > article');
      this._arenaNav = this.getButton(); // arena navigation
      if (typeof a === 'object' && a !== null && a.hasChildNodes()) {
        console.log('Arena already exists!');
        this._arena = a;
      } else {
        this._arena = document.createElement('div');
        this._arena.className = 'wrapper';
        // arena field
        let table = document.createElement('table');
        table.setAttribute('id', 'arena');
        let r = 0;
        while (++r <= 7) {
          let c = 0;
          let tr = document.createElement('tr');
          while (c <= 9) {
            let td = document.createElement('td');
            td.setAttribute('id', r + '' + c);
            tr.appendChild(td);
            c++;
          }
          table.appendChild(tr);
        }

        table.onclick = function(event) { // set onclick function
          let target = event.target;
          switch (target.tagName) {
            case 'TD':
              Arena.moveUnit(target);
              break;
            case 'IMG':
              let targetInfo = Abstract.getInfoByDiv(target.parentNode.parentNode);
              if (targetInfo.side === 'blue') {
                this.blue.buff(target);
              } else {
                this.attack(targetInfo);
              }
              break;
          }
        }.bind(this);

        this._arena.appendChild(table);
        // arena fill
        this.prepareArena(this.blue);
        // army list
        this._arena.appendChild(this.blue.getArmyList());
      }
    }

    getArena() {
      if (!this._arena || this._arenaNav) {
        this.init();
      }
      return {arena: this._arena, nav: this._arenaNav};
    }

    getButton() {
      if (this._arenaNav === null) {
        let btn = document.createElement('button');
        btn.className = 'start';
        btn.innerText = 'Start';
        btn.onclick = function () {
          let army = document.getElementById('army-list');
          if (!army.hasChildNodes() || confirm('Don\'t use all units?')) {
            window.startBattle();
          }
        };
        this._arenaNav = btn;
      }
      return this._arenaNav;
    }

    static moveUnit(target) {
      /**
       * @property {Unit} blue
       */
      if (!window.inBattle) {
        if (target.tagName === 'TD' && !target.hasChildNodes() && window.currentUnit.blue) {
          window.currentUnit.blue.move(target.getAttribute('id'));
        }
      } else {
        if (window.currentUnit.blue) {
          let position = target.getAttribute('id');
          if (!target.hasChildNodes()) {
            window.currentUnit.blue.move(position);
          }
        } else {
          console.log('-');
        }
      }
    }

    attack(targetInfo) {
      let unit = this.red.units.getItem(targetInfo.id);
      if (window.currentUnit.blue) {
        window.currentUnit.blue.attack(unit);
      }
      this.checkArmy();
    }

    checkArmy() {
      let anyoneAlive = false;
      this.red.units.toArray().forEach(function (unit) {
        if (unit.alive()) {
          anyoneAlive = true;
        }
      });
      if (!anyoneAlive) {
        this.endGame();
      }
    }

    endGame() {
      setTimeout(function () {
        alert('Victory');
        location.reload();
      }, 300);
    }

    prepareArena(army) {
      army.units.toArray().forEach(function (unit) {
        if (unit.pos()) {
          let td = this._arena.querySelector('td[id="' + unit.pos() + '"]');
          if (td && !td.hasChildNodes()) {
            td.appendChild(unit.toHtml());
          } else {
            console.error('td has child, id: ' + td.getAttribute('id'));
          }
        }
      }, this);
    }

    start() {
      this.showRedArmy();
      Army.removeArmyList();
      this.TimeLine.show();
    }

    nextUnit()
    {
      if (!this.queue) {
        console.log('getQueue');
        this.queue = this.TimeLine.getQueue();
      }

      let a = this.queue.first();

      this.blue.selectUnit(false, a, this.red);
    }

    showRedArmy() {
      if (this.redPlayer) {
        this.prepareArena(this.red);
      }
    }
  }

  return Arena;
});