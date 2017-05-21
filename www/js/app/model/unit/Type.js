/**
 * @module model/unit/Type
 */
define(function () {
  class Type {
    constructor(type, config) {
      this._name       = config.name;
      this._icon       = config.icon;
      this._hp         = config.hp;
      this._maxHp      = config.hp;
      this._dmg        = config.dmg;
      this._range      = config.range;
      this._mSpeed     = config.mSpeed;
      this._initiative = config.initiative;
      this._type       = type;
    }

    getType() {
      return this._type;
    }

    getName() {
      return this._name;
    }

    getIcon() {
      return this._icon;
    }

    getHealth() {
      return this._hp;
    }

    getMaxHealth() {
      return this._maxHp;
    }

    setHealth(hp) {
      this._hp = hp;
      return this;
    }

    getDamage() {
      return this._dmg;
    }

    getRange() {
      return this._range;
    }

    getMoveSpeed() {
      return this._mSpeed;
    }

    getInitiative()
    {
      return this._initiative;
    }
}

  return Type;
});