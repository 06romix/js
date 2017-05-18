define(function () {
  function Action() {}

  Action.prototype = {
    canMake: function (c, pos, agl) {
      var y = Math.abs(String(c).charAt(0) - String(pos).charAt(0));
      var x = Math.abs(String(c).charAt(1) - String(pos).charAt(1));
      return y <= agl && x <= agl && this.config[agl] !== undefined && this.config[agl][y][x];
    }
  };

  return Action;
});