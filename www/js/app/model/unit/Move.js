/**
 * @module model/unit/Move
 */
define(['./Action'], function (Action) {
  class Move extends Action {
    constructor() {
      super();
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

  }

  return new Move();
});