/**
 * @module model/Unit
 */
define(['./unit/Types', './Abstract', './unit/Move', './unit/Attack', './TimeLine'],
  function (Types, Abstract, Move, Attack, TimeLine) {

  class Unit extends Abstract {
    constructor(id, config, side) {
      super();
      /**
       * @constructor
       * @property {Type} Type
       * @property {Move} Move
       * @property {Attack} Attack
      */
      this._id    = id;
      this._side  = side;
      this._alive = true;
      this._pos   = (config.hasOwnProperty('position')) ? config.position  : null;
      this._buff  = (config.hasOwnProperty('buff'))     ? config.buff      : null;
      this.Type   = Types.getTypeInfo(config.type);
      this.Move   = Move;
      this.Attack = Attack;
      this._show  = {move: false, attack: false};
      this._start = 1;
      this.mX     = 9;
      this.mY     = 7;

      this.initPosBySide();
    }

    get id() {
      return this.getSide('short') + this._id;
    }

    get initiative()
    {
      return this.Type.getInitiative();
    }

    toHtml(data = '') {
      let div = document.createElement('div');
      div.setAttribute(data + 'id', this.id);
      div.className = this.getSide() + ' ra-hover';
      let input = document.createElement('input');
      input.setAttribute(data + 'id', 'i' + this.id);
      input.setAttribute('type', 'radio');
      input.setAttribute('name', this.getSide());
      let label = document.createElement('label');
      label.appendChild(input);
      let img = document.createElement('img');
      img.src = 'img/' + this.Type.getIcon() + '.png';
      img.className = 'unit-icon';
      label.appendChild(img);
      let hp = document.createElement('div');
      hp.className = 'health-bar';
      label.appendChild(hp);
      div.appendChild(label);
      return div;
    }

    toQueueObj()
    {
      return {id: this.id, initiative: 100 - this.initiative};
    }

    pos(pos) {
      if (!arguments.length) {
        return this._pos;
      }
      this._pos = pos;
      return this._pos;
    }

    initPosBySide() {
      if (this.getSide() === 'red') {
        let y = String(this.pos()).charAt(0);
        let x = String(this.pos()).charAt(1);
        this.pos(y + (Math.abs(+x - 8) + 1));
      }
    }

    validStartPosition(pos) {
      return this.getSide() === 'blue'
        ? (String(pos).charAt(1) <= this._start)
        : ((Math.abs(String(pos).charAt(1) - this.mX) + 1) >= Math.abs(this._start - this.mX) + 1);
    }

    showMoveVariants() {
      if (this._show.move) return;
      let arr = document.querySelectorAll('#arena td');
      arr.forEach(function (td) {
        /**
         * @var this Unit
         * @property {Move} Move
         * @property Type} Type
         */
        if (!td.hasChildNodes() && (
          !window.inBattle && this.validStartPosition(td.getAttribute('id'))
          || window.inBattle && this.Move.canMake(this.pos(), td.getAttribute('id'), this.Type.getMoveSpeed()))
        ) {
          Unit.highlight(td, 'move');
        }
      }, this);
      this._show.move = true;
    }

    showAttackVariants() {
      if (this._show.attack) return;
      let arr = document.querySelectorAll('#arena td');
      arr.forEach(function (td) {
        if (td.hasChildNodes() && window.inBattle
          && Abstract.getInfoByDiv(td.firstChild).side !== window.side
          && this.Attack.canMake(this.pos(), td.getAttribute('id'), this.Type.getRange())
        ) {
          Unit.highlight(td, 'attack');
        }
      }, this);
      this._show.attack = true;
    }

    hideVariants() {
      let arr = document.querySelectorAll('#arena td');
      arr.forEach(Unit.disableLight);
      this._show.move = this._show.attack = false;
    }

    static highlight(element, action) {
      if (element.className) {
        element.className += ' ' . action;
      } else {
        element.className = action;
      }
    }

    static disableLight(element) {
      element.className = '';
    }

    attack(target) {
      this.Attack.attack(this, target);
      this.finishCourse();
    }

    move(position) {
      console.log('move to: ' + position);
      if (position < 10 || position > +(this.mY + '' + this.mX)) {
        console.error('!');
        return false;
      }

      let td = document.getElementById(position);
      if (!this.pos() && this.validStartPosition(position) && !td.hasChildNodes()
        || !window.inBattle && !td.hasChildNodes() && this.validStartPosition(position)
        || window.inBattle && this.Move.canMake(this.pos(), position, this.Type.getMoveSpeed())
      ) {
        td.appendChild(document.getElementById(this.id));
        this.pos(position);
      }
      this.finishCourse();
    }

    setHealthBarPercent(percent) {
      document.getElementById(this.id).firstChild.lastChild.style.width = percent + '%';
    }

    alive() {
      return this._alive;
    }

    die() {
      this._alive = false;
      this.finishCourse();
      document.getElementById(this.id).remove();
    }

    canBuff() {
      return this._buff;
    }

    buff(unit) {
      //TODO: buff
      console.log(this.canBuff());
      this.finishCourse();
    }

    finishCourse() {
      this.deselect();
      this.hideVariants();
      if (window.inBattle) {
        TimeLine.removeFirst();
        window.nextUnit();
      }
    }

    deselect() {
      document.getElementById('i' + this.id).checked = false;
      document.getElementById(this.id).classList.remove('select');
      window.currentUnit.blue = null;
    }
  }

  return Unit;
});