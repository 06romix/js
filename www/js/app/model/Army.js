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
      console.log(this);
      this.config.units.forEach(function (unitConf, id) {
        this.units.push(new Unit(id, unitConf, this.config.side))
      }, this);
      return this;
    },

    selectUnit: function (target, units) {
      var parent = target.parentNode;
      if (window.currentUnit.blue) {
        window.currentUnit.blue.hideMoveVariants();
      }
      if (parent.tagName == 'LABEL') {
        if ((parent = parent.parentNode).tagName === 'DIV') {
          console.log(parent);
          window.currentUnit.blue = parent.getAttribute('id');
          window.currentUnit.blue = (units[window.currentUnit.blue] instanceof Unit)
            ? window.currentUnit.blue = units[window.currentUnit.blue]
            : null;
          if (window.currentUnit.blue) {
            window.currentUnit.blue.showMoveVariants();
          }
        }
      }
    },

    getArmyList: function () {
      var self = this;
      // console.log('getArmyList');
      // console.log(self.units);
      if (!self.units.length) {
        self.collect();
      }
      var i = 0;
      var list = document.createElement('div');
      list.setAttribute('id', 'army-list');
      self.units.forEach(function (unit) {
        if (!unit.pos()) {
          list.append(unit.toHtml());
          i++;
        }
      });
      list.onclick = function(event) {
        var target = event.target;
        if (target.tagName != 'IMG') return;
        self.selectUnit(target, self.units);
      };
      self.count = i;
      return list;
    }
  };

  return Army;
});
