define(function () {
  function Type(type, config) {
    this._name = config.name;
    this._icon = config.icon;
    this._hp = config.hp;
    this._maxHp = config.hp;
    this._dmg = config.dmg;
    this._range = config.range;
    this._mSpeed = config.mSpeed;
    this._type = type;
}

  Type.prototype.getType = function () {
    return this._type;
  };

  Type.prototype.getName = function () {
    return this._name;
  };

  Type.prototype.getIcon = function () {
    return this._icon;
  };

  Type.prototype.getHealth = function () {
    return this._hp;
  };

  Type.prototype.getMaxHealth = function () {
    return this._maxHp;
  };

  Type.prototype.setHealth = function (hp) {
    this._hp = hp;
    return this;
  };

  Type.prototype.getDamage = function () {
    return this._dmg;
  };

  Type.prototype.getRange = function () {
    return this._range;
  };

  Type.prototype.getMoveSpeed = function () {
    return this._mSpeed;
  };

  return Type;
});