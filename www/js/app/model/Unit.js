define(['./unit/Types', './Abstract', './unit/Move', './unit/Attack'], function (Types, Abstract, Move, Attack) {

  function Unit(id, config, side) {
    var self = this;
    self.id   = id;
    self._side = side;
    self._pos  = (config.hasOwnProperty('position')) ? config.position  : null;
    self._buff = (config.hasOwnProperty('buff'))     ? config.buff      : null;
    self.Type = Types.getTypeInfo(config.type);
    self.Move = Move;
    self.Attack = new Attack();
    self.start  = 1;
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
      img.src = 'img/' + self.Type.getIcon() + '.png';
      img.className = 'unit-icon';
      label.appendChild(img);
      var hp = document.createElement('div');
      hp.className = 'health-bar';
      label.appendChild(hp);
      div.appendChild(label);
      self.html = div;
      // }
      return self.html;
    };
  }

  Unit.prototype = Object.create(Abstract.prototype);

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
          || window.inBattle && this.Move.canMake(this.pos(), td.getAttribute('id'), this.Type.getMoveSpeed()))
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

  Unit.prototype.attack = function (target) {
      console.log('attack');
      this.Attack.attack(this, target);
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
        || window.inBattle && this.Move.canMake(this.pos(), position, this.Type.getMoveSpeed())
      ) {
        td.appendChild(document.getElementById(this.id));
        this.pos(position);
      }
      this.finishCourse();
  };

  Unit.prototype.setHealthBarPercent = function (percent) {
    document.getElementById(this.id).firstChild.lastChild.style.width = percent + '%';
  };

  Unit.prototype.die = function () {
    this.finishCourse();
    document.getElementById(this.id).remove();
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