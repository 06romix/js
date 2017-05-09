define(function () {
  function ControllerBase(id) {
    this.id = id;
    this.army = {blue: null, red: null};
  }

  ControllerBase.prototype = {
    setTabs: function(tabs) {
      this.tabs = tabs;
    },

    setBlueArmy: function(army) {
      this.army.blue = army;
    },

    setRedArmy: function(army) {
      this.army.red = army;
    },

    setArena: function(Arena) {
      this.arena = new Arena(this.army);
    },

    setInBattle: function(inBattle) {
      this.inBattle = inBattle;
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
      console.log();
      if (hld.switch() && hld.getArticle().tagName === 'ARTICLE') {
        hld.article.appendChild(this.arena.getArena());
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
