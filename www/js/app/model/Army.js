define(['./Unit', './Abstract'], function (Unit, Abstract) {
  function Army(config) {
    var self = this;
    self.config = config;
    self._side = config.side;
    self.units = [];
  }

  Army.prototype = Object.create(Abstract.prototype);

  Army.prototype.collect = function() {
    console.log(this);
    this.config.units.forEach(function (unitConf, id) {
      this.units.push(new Unit(String(this.getSide()).charAt(0) + id, unitConf, this.getSide()))
    }, this);
    return this;
  };

  Army.prototype.selectUnit = function (target) {
    var parent = target.parentNode;
    if (window.currentUnit.blue) {
      window.currentUnit.blue.hideMoveVariants();
      console.log('hide');
    }
    if (parent.tagName == 'LABEL') {
      if ((parent = parent.parentNode).tagName === 'DIV') {
        var id = parent.getAttribute('id');
        var side = id.charAt(0);
        id = parent.getAttribute('id').charAt(1);
        if (side == 'b') {
          window.currentUnit.blue = (this.units[id] instanceof Unit)
            ? this.units[id]
            : null;
        } else {
          window.currentUnit.red = (this.units[id] instanceof Unit)
            ? this.units[id]
            : null;
          console.log(id);
        }

        if (window.currentUnit.blue && side == 'b') {
          window.currentUnit.blue.showMoveVariants();
        }
      }
    }
  };

  Army.prototype.getArmyList = function () {
    if (!this.units.length) {
      this.collect();
    }
    var i = 0;
    var list = document.createElement('div');
    list.setAttribute('id', 'army-list');
    this.units.forEach(function (unit) {
      if (!unit.pos()) {
        list.append(unit.toHtml());
        i++;
      }
    }, this);
    list.onclick = function(event) {
      var target = event.target;
      if (target.tagName != 'IMG') return;
      this.selectUnit(target);
    }.bind(this);
    return list;
  };

  Army.prototype.removeArmyList = function () {
    document.getElementById('army-list').remove();
  };

  return Army;
});
