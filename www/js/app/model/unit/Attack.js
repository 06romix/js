/**
 * @module model/unit/Attack
 */
define(['./Action'], function (Action) {
  class Attack extends Action {
    constructor() {
      super();

      this.config[1] = [
        [0, 1],
        [1, 1]
      ];
      this.config[2] = [
        [0, 1, 1],
        [1, 1, 0],
        [1, 0, 0]
      ];
      this.config[3] = [
        [0, 1, 1, 1],
        [1, 1, 1, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0]
      ];
      this.config[4] = [
        [0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0]
      ];
      this.config[5] = [
        [0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0, 0],
        [1, 1, 0, 0, 0, 0]
      ];
    }

    /**
     * @param {Unit} Unit
     * @param {Unit} Target
     */
    attack(Unit, Target) {
      if (this.canMake(Unit.pos(), Target.pos(), Unit.Type.getRange())) {
        let hpAfterAttack = Target.Type.getHealth() - Unit.Type.getDamage();
        if (hpAfterAttack > 0) {
          Target.Type.setHealth(hpAfterAttack);
          Target.setHealthBarPercent(Target.Type.getHealth() *100 / Target.Type.getMaxHealth());
        } else {
          Target.Type.setHealth(0);
          Target.setHealthBarPercent(0);
          Target.die();
        }
      }
    }
  }

  return Attack;
});