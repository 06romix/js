/**
 * @module model/unit/Action
 */
define(function () {
  class Action {
    constructor() {
      this.config = [];
    }
    canMake(c, pos, agl) {
      let y = Math.abs(String(c).charAt(0) - String(pos).charAt(0));
      let x = Math.abs(String(c).charAt(1) - String(pos).charAt(1));
      return agl >= y && agl >= x && agl >= this.config[y][x] && this.config[y][x];
    }
  }

  return Action;
});