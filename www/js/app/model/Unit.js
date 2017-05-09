define(['./Types'], function (types) {

  function Unit(id, config, side) {
    var self = this;
    self.id = id;
    self.side = side;
    self.type = (config.hasOwnProperty('type')) ? config.type : null;
    self.pos = (config.hasOwnProperty('position')) ? config.position : null;
    self.buff = (config.hasOwnProperty('buff')) ? config.buff : null;
    // self.html = null;

    self.toHtml = function () {
      // if (!self.html) {
      var div = document.createElement('div');
      div.setAttribute('id', id);
      div.className = self.side + ' ra-hover';
      var input = document.createElement('input');
      input.setAttribute('id', 'chb' + id);
      input.setAttribute('type', 'checkbox');
      var label = document.createElement('label');
      label.appendChild(input);
      var i = document.createElement('i');
      i.className = 'ra ' + types[self.type].icon;
      label.appendChild(i);
      div.appendChild(label);
      self.html = div;
      // }
      return self.html;
    };
  }

  Unit.prototype = {
    getSide: function () {
      return this.side;
    },

    attack: function () {

    },

    move: function () {

    },

    die: function () {

    },

    canBuff: function () {
      return this.buff;
    },

    buff: function (unit) {
      //TODO: buff
    }
  };

  return Unit;
});