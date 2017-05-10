define(['./Types'], function (types) {

  function Unit(id, config, side) {
    var self = this;
    self.id = id;
    self.side = side;
    self.type = (config.hasOwnProperty('type')) ? config.type : null;
    self._pos = (config.hasOwnProperty('position')) ? config.position : null;
    self.buff = (config.hasOwnProperty('buff')) ? config.buff : null;
    self.typeConfig = (types[self.type]) ? types[self.type] : null;
    self.start = 2;
    self._light = false;

    self.toHtml = function () {
      // if (!self.html) {
      var div = document.createElement('div');
      div.setAttribute('id', id);
      div.className = self.side + ' ra-hover';
      var input = document.createElement('input');
      input.setAttribute('id', 'i' + id);
      input.setAttribute('type', 'radio');
      input.setAttribute('name', self.side);
      var label = document.createElement('label');
      label.appendChild(input);
      var img = document.createElement('img');
      img.src = 'img/' + types[self.type].icon + '.png';
      img.className = 'unit-icon';
      label.appendChild(img);
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

    pos: function (pos) {
      if (!arguments.length) {
        return this._pos;
      }
      this._pos = pos;
      return this._pos;
    },

    validStartPosition: function (pos) {
      return String(pos).charAt(1) <= this.start;
    },

    showMoveVariants: function () {
      if (this._light) return;
      if (!window.inBattle) {
        var arr = document.querySelectorAll('#arena td');
        arr.forEach(function (td) {
          if (this.validStartPosition(td.getAttribute('id')) && !td.hasChildNodes()) {
            this.highlight(td);
          }
        }, this);
      }
      this._light = true;
    },

    hideMoveVariants: function () {
      if (!this._light) return;
      if (!window.inBattle) {
        var arr = document.querySelectorAll('#arena td');
        arr.forEach(function (td) {
          this.disableLight(td);
        }, this);
      }
      this._light = false;
    },

    highlight: function (element) {
      if (element.className) {
        element.className += ' light';
      } else {
        element.className = 'light';
      }
    },

    disableLight: function (element) {
      element.className = '';
    },

    attack: function () {
      console.log('attack');
      this.finishCourse();
    },

    move: function (position) {
      console.log('move to: ' + position);
      console.log(this.typeConfig.agl);
      if (position < 11 || position > 58) {
        console.error('!');
        return false;
      }

      var td = document.getElementById(position);

      if (!this.pos() && this.validStartPosition(position) && !td.hasChildNodes()
        || !window.inBattle && !td.hasChildNodes() && this.validStartPosition(position)
      ) {
        td.appendChild(document.getElementById(this.id));
      }
      this.finishCourse();
    },

    die: function () {
      console.log('die');
      this.finishCourse();
    },

    canBuff: function () {
      return this.buff;
    },

    buff: function (unit) {
      //TODO: buff
      this.finishCourse();
    },

    finishCourse: function () {
      this.deselect();
      this.hideMoveVariants()
    },

    deselect: function () {
      document.getElementById('i' + this.id).checked = false;
      window.currentUnit.blue = null;
    }
  };

  return Unit;
});