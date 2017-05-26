/**
 * @module model/unit/Attack
 */
define(['./Action'], function (Action) {
  class Attack extends Action {
    constructor() {
      super();

      this.config = [
        [0, 1, 2, 3, 4, 5],
        [1, 1, 3, 4, 5, 5],
        [2, 3, 4, 4, 5, 0],
        [3, 4, 4, 5, 1, 0],
        [4, 5, 5, 5, 0, 0],
        [5, 5, 0, 0, 0, 0]
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

  return new Attack();
});