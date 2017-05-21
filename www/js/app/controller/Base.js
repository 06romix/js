define(['../model/Player', '../model/TimeLine'], function (Player, TimeLine) {
  class ControllerBase {
    constructor(id) {
      this.id       = id;
      this.army     = {blue: null, red: null};
      this._arena   = null;
      this._players = {};
      this.inBattle = false;
    }

    run()
    {
      this._arena.TimeLine = new TimeLine(this.player());
      this.setInBattle(false); //for prepare Army
      window.startBattle = function () {
        this._arena.start();
        window.inBattle = true;
        window.currentUnit = {blue: null, red: null};
        document.querySelector('.start').remove();
      }.bind(this);
      window.next = function () {
        window.currentUnit.blue = this._arena.nextUnit();
      }.bind(this);
    }

    setTabs(tabs)
    {
      this.tabs = tabs;
    }

    player(player)
    {
      if (!arguments.length) {
        return this._players;
      }
      if (player instanceof Player) {
        this.addPlayer(player)
      }
    }

    addPlayer(player)
    {
      this._players[player.side()] = player;
      this.army[player.side()] = player.army();
    }

    setArena(Arena)
    {
      this._arena = new Arena(this.army);
      if (this.player().red instanceof Player && this.player().red.side() === 'red') {
        this._arena.redPlayer = this.player().red;
      }
    }

    setInBattle(inBattle) {
      this.inBattle = inBattle;
      window.inBattle = inBattle;
    }

    showArmy() {
      let canLeave = this.inBattle ? confirm('Left the battle?') : true;
      if (!canLeave) {
        return;
      }
      if (!this.tabs.tabs.hasOwnProperty('army-holder')) {
        console.error('Tab army-holder don\'t set');
        return;
      }

      let hld = this.tabs.tabs['army-holder'];
      if (hld.switchTab() && hld.getArticle().tagName === 'ARTICLE') {
        console.log(hld.article);
        this.army.blue.units.forEach(function (unit) {
          hld.article.appendChild(unit.toHtml());
        });
      }
    }

    showArena() {
      if (!this.tabs.tabs.hasOwnProperty('arena-holder')) {
        console.error('Tab arena-holder don\'t set');
        return;
      }
      let hld = this.tabs.tabs['arena-holder'];
      if (hld.switchTab() && hld.getArticle().tagName === 'ARTICLE') {
        console.log(this._arena.getArena());
        hld.article.appendChild(this._arena.getArena().arena);
        let navHld = document.getElementById('right-nav');
        navHld.appendChild(this._arena.getArena().nav);
        window.currentUnit = {blue: null, red: null};
        window.side = 'blue';
      }
    }

    showSpells() {
      if (!this.tabs.tabs.hasOwnProperty('spells-holder')) {
        console.error('Tab spells-holder don\'t set');
        return;
      }
      let hld = this.tabs.tabs['spells-holder'];
      hld.switchTab();
    }
  }

  return new ControllerBase;
});
