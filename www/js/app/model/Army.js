define(['./Unit', './FuncElement'], function (Unit, FuncElement) {
  function Army(config) {
    var self = this;
    self.config = config;
    self.count = 0;
    self.units = [];

    // self.prepareUnit = function (element) {
    //   return new FuncElement(element)
    // };

    // self.createUnit = function(element) {
    //   var funcEl = self.prepareUnit(element);
    //   self.units[funcEl.id] = new Unit(funcEl.id, funcEl.type, self.config.side);
    // };
  }

  Army.prototype = {
    collect: function() {
      var self = this;
      console.log(this);
      this.config.units.forEach(function (unitConf, id) {
        self.units.push(new Unit(id, unitConf, self.config.side))
      });
      return self;
    },

    getArmyList: function () {
      // console.log('getArmyList');
      // console.log(self.units);
      if (!this.units.length) {
        this.collect();
      }
      var i = 0;
      var list = document.createElement('div');
      list.className = 'army-list';
      this.units.forEach(function (unit) {
        list.append(unit.toHtml());
        i++;
      });
      list.onclick = function(event) {
        var target = event.target;
        if (target.tagName != 'DIV') return;
        this.doSomething(target);
      };
      this.count = i;
      return list;
    }
  };

  return Army;
});
