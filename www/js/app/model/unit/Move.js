define(['./Action'], function (Action) {
  function Move() {
    this.config = [];

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

  Move.prototype = Object.create(Action.prototype);

  return new Move();
});