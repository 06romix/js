define(['../config/blue-army', '../config/red-army', './Army'], function (blue, red, Army) {

  function Player(id, side) {
    var self = this;
    self._id = id;
    self._side = side;
    self._army = null;
    var init = false;

    self.init = function () {
      if (!init) {
        init = true;
        switch (self.side()) {
          case  blue.side:
            self._army = blue;
            break;
          case red.side:
            self._army = red;
            break;
          default:
            init = false;
            console.error('Army don\'t set');
        }
        if (self._army !== null) {
          self._army = new Army(self._army).collect();
        }
      }
      return self;
    };

    self.getId = function () {
      return self._id;
    };

    self.side = function (side) {
      if (!arguments.length) return self._side;
      self._side = side;
      return self;
    };

    self.army = function (army) {
      if (!arguments.length) {
        if (init) {
          return self._army;
        } else {
          console.error('Player not init');
          return false;
        }
      }
      switch (self.side()) {
        case  blue.side:
          self._army = blue;
          break;
        case red.side:
          self._army = red;
          break;
        default:
          console.error('Army don\'t set');
      }
      return self;
    };
  }

  return Player;
});
