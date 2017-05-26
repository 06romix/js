/**
 * @module model/Player
 */
define(['../config/blue-army', '../config/red-army', './Army'], function (blue, red, Army) {

  class Player {
    constructor(id, side) {
      this._id = id;
      this._side = side;
      this._army = null;
      this._init = false;
    }

    init() {
      if (!this._init) {
        this._init = true;
        switch (this.side()) {
          case  blue.side:
            this._army = blue;
            break;
          case red.side:
            this._army = red;
            break;
          default:
            this._init = false;
            console.error('Army don\'t set');
        }
        if (this._army !== null) {
          this._army = new Army(this._army).collect();
        }
      }
      return this;
    }

    get id() {
      return this._id;
    }

    side(side) {
      if (!arguments.length) return this._side;
      this._side = side;
      return this;
    };

    army(army) {
      if (!arguments.length) {
        if (this._init) {
          return this._army;
        } else {
          console.error('Player not init');
          return false;
        }
      }
      switch (this.side()) {
        case  blue.side:
          this._army = blue;
          break;
        case red.side:
          this._army = red;
          break;
        default:
          console.error('Army don\'t set');
      }
      return this;
    }
  }

  return Player;
});
