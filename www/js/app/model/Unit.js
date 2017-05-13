define(['./user/Types', './user/Move', './Abstract'], function (types, move, Abstract) {

  function Unit(id, config, side) {
    var self = this;
    self.id   = id;
    self._side = side;
    self.type       = (config.hasOwnProperty('type'))     ? config.type      : null;
    self._pos       = (config.hasOwnProperty('position')) ? config.position  : null;
    self._buff      = (config.hasOwnProperty('buff'))     ? config.buff      : null;
    self.typeConfig = (types[self.type])                  ? types[self.type] : null;
    self.start  = 1;
    self.Move = move;
    self._light = false;
    self.initPosBySide();
    self.mX = 9;
    self.mY = 7;

    self.toHtml = function () {
      // if (!self.html) {
      var div = document.createElement('div');
      div.setAttribute('id', id);
      div.className = self.getSide() + ' ra-hover';
      var input = document.createElement('input');
      input.setAttribute('id', 'i' + id);
      input.setAttribute('type', 'radio');
      input.setAttribute('name', self.getSide());
      var label = document.createElement('label');
      label.appendChild(input);
      var img = document.createElement('img');
      img.src = 'img/' + self.typeConfig.icon + '.png';
      img.className = 'unit-icon';
      label.appendChild(img);
      div.appendChild(label);
      self.html = div;
      // }
      return self.html;
    };
  }

  Unit.prototype = Object.create(Abstract.prototype);


  Unit.prototype.getMoveSpeed = function () {
      return this.typeConfig.mSpeed;
  };

  Unit.prototype.pos = function (pos) {
      if (!arguments.length) {
        return this._pos;
      }
      this._pos = pos;
      return this._pos;
  };

  Unit.prototype.initPosBySide = function () {
      if (this.getSide() == 'red') {
        var y = String(this.pos()).charAt(0);
        var x = String(this.pos()).charAt(1);
        this.pos(y + (Math.abs(+x - 8) + 1));
      }
  };

  Unit.prototype.validStartPosition = function (pos) {
      return this.getSide() == 'blue'
        ? (String(pos).charAt(1) <= this.start)
        : ((Math.abs(String(pos).charAt(1) - this.mX) + 1) >= Math.abs(this.start - this.mX) + 1);
  };

  Unit.prototype.showMoveVariants = function () {
      if (this._light) return;
      var arr = document.querySelectorAll('#arena td');
      arr.forEach(function (td) {
        if (!td.hasChildNodes() && (
          !window.inBattle && this.validStartPosition(td.getAttribute('id'))
          || window.inBattle && this.Move.canMove(this.pos(), td.getAttribute('id'), this.getMoveSpeed()))
        ) {
          this.highlight(td);
        }
      }, this);
      this._light = true;
  };

  Unit.prototype.hideMoveVariants = function () {
      var arr = document.querySelectorAll('#arena td');
      arr.forEach(function (td) {
        this.disableLight(td);
      }, this);
      this._light = false;
  };

  Unit.prototype.highlight = function (element) {
      if (element.className) {
        element.className += ' light';
      } else {
        element.className = 'light';
      }
  };

  Unit.prototype.disableLight = function (element) {
      element.className = '';
  };

  Unit.prototype.attack = function () {
      console.log('attack');
      this.finishCourse();
  };

  Unit.prototype.move = function (position) {
      console.log('move to: ' + position);
      if (position < 10 || position > +(this.mY + '' + this.mX)) {
        console.error('!');
        return false;
      }

      var td = document.getElementById(position);

      if (!this.pos() && this.validStartPosition(position) && !td.hasChildNodes()
        || !window.inBattle && !td.hasChildNodes() && this.validStartPosition(position)
        || window.inBattle && this.Move.canMove(this.pos(), position, this.getMoveSpeed())
      ) {
        td.appendChild(document.getElementById(this.id));
        this.pos(position);
      }
      this.finishCourse();
  };

  Unit.prototype.die = function () {
      console.log('die');
      this.finishCourse();
  };

  Unit.prototype.canBuff = function () {
      return this._buff;
  };

  Unit.prototype.buff = function (unit) {
      //TODO: buff
      this.finishCourse();
  };

  Unit.prototype.finishCourse = function () {
      this.deselect();
      this.hideMoveVariants();
  };

  Unit.prototype.deselect = function () {
      document.getElementById('i' + this.id).checked = false;
      window.currentUnit.blue = null;
  };

  return Unit;
});