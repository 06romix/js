define(['../Abstract', './Move', './Attack'], function (AbstractModel, Move, Attack) {

  function Abstract() {
    this.Move = new Move();
    this.Attack = new Attack();
  }

  Abstract.prototype = Object.create(AbstractModel.prototype);

  return Abstract;
});