define(function () {
  function Move() {
    this.config = [];

    this.config[2] = [2, 1, 0];
    this.config[3] = [3, 2, 1, 0];
    this.config[4] = [4, 3, 3, 2, 0];
    this.config[5] = [5, 5, 4, 4, 3, 1];
  }

  Move.prototype = {
    canMove: function (c, pos, agl) {
      var can = false;
      var r = Math.abs(c - pos);
      this.config[agl].forEach(function (n, i) {
        if (Math.abs(String(c).charAt(0) - String(pos).charAt(0)) == i && i * 10 + n >= r && r >= i * 10 - n) {
          can = true;
          return false;
        }
      });
      return can;
    }
  };

  return new Move();
});