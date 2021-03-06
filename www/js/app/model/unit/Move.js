/**
 * @module model/unit/Move
 */
define(['./Action'], function (Action) {
  class Move extends Action {
    constructor() {
      super();

      this.config = [
        [0, 1, 2, 3, 4, 5],
        [1, 1, 3, 4, 5, 5],
        [2, 3, 4, 4, 5, 0],
        [3, 4, 4, 5, 5, 0],
        [4, 5, 5, 5, 0, 0],
        [5, 5, 0, 0, 0, 0]
      ];
    }
  }

  return new Move();
});