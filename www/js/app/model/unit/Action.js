define(function () {
  function Action() {}

  Action.prototype = {
    canMake: function (c, pos, agl) {
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

  return Action;
});