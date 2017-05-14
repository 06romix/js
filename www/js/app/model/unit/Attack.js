define(['./Action'], function (Action) {
  function Attack() {
    this.config = [];

    this.config[1] = [1, 0];
    this.config[2] = [2, 1, 0];
    this.config[3] = [3, 2, 1, 0];
    this.config[4] = [4, 3, 3, 2, 0];
    this.config[5] = [5, 5, 4, 4, 3, 1];
  }

  Attack.prototype = Object.create(Action.prototype);

  Attack.prototype.attack = function (Unit, Target) {
    if (this.canMake(Unit.pos(), Target.pos(), Unit.Type.getRange())) {
      var hpAfterAttack = Target.Type.getHealth() - Unit.Type.getDamage();
      if (hpAfterAttack > 0) {
        Target.Type.setHealth(hpAfterAttack);
        Target.setHealthBarPercent(Target.Type.getHealth() *100 / Target.Type.getMaxHealth());
      } else {
        Target.Type.setHealth(0);
        Target.setHealthBarPercent(0);
        Target.die();
      }
    }
  };

  return Attack;
});