'use strict'
var unitTypes = {
  w: {
    name: 'warrior',
    icon: 'ra-sword',
    hp: 100,
    dmg: 30,
    range: 1,
    agl: 3,
  },
  a: {
    name: 'archer',
    icon: 'ra-archer',
    hp: 75,
    dmg: 40,
    range: 4,
    agl: 2,
  },
  m: {
    name: 'magic',
    icon: 'ra-crystal-wand',
    hp: 50,
    dmg: 50,
    range: 2,
    agl: 2,
  }
};

var bluePlayer = {
  side: 'blue',
  units: [
    {
      type: 'm',
      position: 11,
    },
    {
      type: 'w',
      position: 12,
    },
    {
      type: 'w',
    },
    {
      type: 'a',
    },
    {
      type: 'w',
      position: 32,
    },
  ],
};

var inBattle = false;
var tabs = new Tabs();
var arena = null;
var blueArmy = new Army(bluePlayer);
blueArmy.collect();

function showArmy() {
  var canLeave = inBattle ? confirm('Left the battle?') : true;
  if (!canLeave) {
    return;
  }
  var hld = new Tab('army-holder');
  hld.switch();
  if (hld.getArticle().tagName === 'ARTICLE') {
    blueArmy.units.forEach(function (unit) {
      hld.article.appendChild(unit.toHtml());
    });
  }
}

function showArena() {
  var hld = new Tab('arena-holder');
  hld.switch();
  if (hld.getArticle().tagName === 'ARTICLE') {
    arena = new Arena();
    hld.article.appendChild(arena.getArena());
  }
}

function showSpells() {
  var hld = new Tab('spells-holder');
  hld.switch();
//  if (hld.getArticle().tagName === 'ARTICLE') {
//    arena = new Arena();
//    hld.article.appendChild(arena.getArena());
//  }
}

function Arena() {
  var self = this;
  self._arena = null;

  self.init = function() {
    var a = document.getElementById('arena');
    if (typeof a === 'object' && a !== null) {
      console.log('Arena already exists!');
      self._arena = a;
    } else {
      self._arena = document.createElement('table');
      self._arena.setAttribute('id', 'arena');
      var r = 0;
      while (++r <= 5) {
        var c = 0;
        var tr = document.createElement('tr');
        while (++c <= 8) {
          var td = document.createElement('td');
          td.setAttribute('id', r + '' + c);
          tr.appendChild(td);
        }
        self._arena.appendChild(tr);
      }
    }
  };

  self.getArena = function () {
    if (!self._arena) {
      self.init();
    }
    return self._arena;
  };
}

function Army(config) {
  var self = this;
  self.config = config;
  self.count = 0;
  self.units = [];

  self.collect = function() {
    self.config.units.forEach(function (unitConf, id) {
      self.units.push(new Unit(id, unitConf, config.side))
    });
    return self;
  };

  self.prepareArmy = function() {
    var i = 0;
    self.units.forEach(function (unit) {

    });
    self.count = i;
  };

  self.prepareUnit = function (element) {
    return new FuncElement(element)
  };

  self.createUnit = function(element) {
    var funcEl = self.prepareUnit(element);
    self.units[funcEl.id] = new Unit(funcEl.id, funcEl.type);
  };
}

function Unit(id, config, side) {
  var self  = this;
  self.id   = id;
  self.side = side;
  self.type = (config.hasOwnProperty('type')) ? config.type : null;
  self.pos  = (config.hasOwnProperty('position')) ? config.position : null;
  self.html = null;

  self.toHtml = function () {
    if (!self.html) {
      var div = document.createElement('div');
      div.className = self.side + ' ra-hover';
      var i = document.createElement('i');
      i.setAttribute('id', id);
      i.className = 'ra ' + unitTypes[self.type].icon;
      div.appendChild(i);
      self.html = div;
    }
    return self.html
  };

  self.attack = function () {

  };

  self.move = function () {

  };

  self.die = function () {

  };
}

function Tab(id) {
  var self = this;
  self.id = id;
  self.source = document.getElementById(id);
  self.article = null;

  tabs.addTab(self);

  self.getArticle = function () {
    var article = self.source.getElementsByTagName('article')[0];
    if (typeof article !== 'undefined') {
      self.article = article;
    }
    return self.article;
  };

  self.clear = function () {
    if (self.getArticle() !== null && self.getArticle().tagName === 'ARTICLE') {
      self.article.remove();
    }
    return self;
  };

  self.switch = function () {
    tabs.switch(self.id);
    if (self.getArticle() === null || self.getArticle().tagName !== 'ARTICLE') {
      self.article = document.createElement('article');
      self.source.appendChild(self.article);
    }
    return self;
  };
}

function Tabs() {
  var self = this;
  self.tabs = {};

  self.addTab = function (tab) {
    if (tab instanceof Tab) {
      self.tabs[tab.id] = tab;
    }
  };

  self.switch = function (id) {
    for (var tabId in self.tabs) {
      if (tabId !== id && self.tabs.hasOwnProperty(tabId)) {
        self.tabs[tabId].clear();
      }
    }
  };
}

function FuncElement(element) {
  var self = this;
  self.source = element;

  self.getDataAttr = function (attr) {
    return self.source.getAttribute('data-' + attr);
  };

  self.id = self.source.getAttribute('id');
}