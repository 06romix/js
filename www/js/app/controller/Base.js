define(['../model/Player'], function (Player) {
  function ControllerBase(id) {
    var self = this;
    self.id = id;
    self.army = {blue: null, red: null};
    self._arena = null;
    self._players = {};
    self.inBattle = false;
  }

  ControllerBase.prototype = {
    setTabs: function(tabs) {
      this.tabs = tabs;
    },

    player: function(player) {
      if (!arguments.length) {
        return this._players;
      }
      if (player instanceof Player) {
        this.addPlayer(player)
      }
    },

    addPlayer: function(player) {
      this._players[player.side()] = player;
      this.army[player.side()] = player.army();
    },

    setArena: function(Arena) {
      this._arena = new Arena(this.army);
      if (this.player().red instanceof Player && this.player().red.side() == 'red') {
        this._arena.redPlayer = this.player().red;
      }
    },

    setInBattle: function(inBattle) {
      this.inBattle = inBattle;
      window.inBattle = inBattle;
    },

    showArmy: function() {
      var canLeave = this.inBattle ? confirm('Left the battle?') : true;
      if (!canLeave) {
        return;
      }
      if (!this.tabs.tabs.hasOwnProperty('army-holder')) {
        console.error('Tab army-holder don\'t set');
        return;
      }

      var hld = this.tabs.tabs['army-holder'];
      if (hld.switch() && hld.getArticle().tagName === 'ARTICLE') {
        console.log(hld.article);
        this.army.blue.units.forEach(function (unit) {
          hld.article.appendChild(unit.toHtml());
        });
      }
    },

    showArena: function() {
      if (!this.tabs.tabs.hasOwnProperty('arena-holder')) {
        console.error('Tab arena-holder don\'t set');
        return;
      }
      var hld = this.tabs.tabs['arena-holder'];
      if (hld.switch() && hld.getArticle().tagName === 'ARTICLE') {
        console.log(this._arena.getArena());
        hld.article.appendChild(this._arena.getArena().arena);
        var navHld = document.getElementById('right-nav');
        navHld.appendChild(this._arena.getArena().nav);
        window.currentUnit = {blue: null, red: null};
        window.side = 'blue';
      }
    },

    showSpells: function() {
      if (!this.tabs.tabs.hasOwnProperty('spells-holder')) {
        console.error('Tab spells-holder don\'t set');
        return;
      }
      var hld = this.tabs.tabs['spells-holder'];
      hld.switch();
    }
  };

  return new ControllerBase;
});
