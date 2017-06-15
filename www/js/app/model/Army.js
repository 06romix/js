/**
 * @module model/Army
 */
define(['./Unit', './Abstract', './unit/UnitCollection'], function (Unit, Abstract, UnitCollection) {
  class Army extends Abstract {
    constructor(config) {
      super();
      this.config = config;
      this._side  = config.side;
      this.units  = new UnitCollection();
    }

    collect()
    {
      this.config.units.forEach(function (unitConf, id) {
        this.units.addItem(new Unit(id, unitConf, this.getSide()));
      }, this);
      return this;
    }

    selectUnit(target, unitId = false, redArmy = false)
    {
      if (window.currentUnit.blue) {
        window.currentUnit.blue.hideVariants();
        console.log('hide');
      }
      window.currentUnit.blue = window.currentUnit.red = null;

      if (unitId || (target = target.parentNode.parentNode).tagName === 'DIV') {
        let id = unitId ? unitId : target.getAttribute('id');
        let side = id.charAt(0);
        if (side === 'b') {
          window.currentUnit.blue = this.units.getItem(id);
          document.getElementById(id).classList.add('select');
          window.currentUnit.blue.showMoveVariants();
          window.currentUnit.blue.showAttackVariants();
        } else {
          window.currentUnit.red = redArmy.units.getItem(id);
        }
        document.getElementById('i' + id).checked = true;
      }
    }

    getArmyList()
    {
      if (this.units.isEmpty()) {
        this.collect();
      }
      let i = 0;
      let list = document.createElement('div');
      list.setAttribute('id', 'army-list');
      this.units.toArray().forEach(function (unit) {
        if (!unit.pos()) {
          list.append(unit.toHtml());
          i++;
        }
      }, this);
      list.onclick = function(event) {
        let target = event.target;
        if (target.tagName !== 'IMG') return;
        this.selectUnit(target);
      }.bind(this);
      return list;
    }

    static removeArmyList() {
      document.getElementById('army-list').remove();
    }
  }

  return Army;
});
