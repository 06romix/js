define(['./Action'], function (Action) {
  function Move() {
    this.config = [];

    this.config[2] = [2, 1, 0];
    this.config[3] = [3, 2, 1, 0];
    this.config[4] = [4, 3, 3, 2, 0];
    this.config[5] = [5, 5, 4, 4, 3, 1];
  }

  Move.prototype = Object.create(Action.prototype);

  return new Move();
});