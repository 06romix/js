/**
 * @module model/TimeLine
 */
define(['./unit/UnitCollection', '../view/TimeLineView', './queue/Queue'],
  function (UnitCollection, TimeLineView, Queue) {

  class TimeLine {
    constructor({blue, red})
    {
      /**
       * @var this TimeLine
       * @property {Player} blue
       * @property {Player} red
       */
      this._blue = blue;
      this._red  = red;
      this._army = [];
      this._collection = null;
      this.view = null;
      this.Queue = Queue;
    }

    getCollection()
    {
      return this.collect()._collection;
    }

    collect()
    {
      this._collection = UnitCollection.combineCollection(this._blue.army().units, this._red.army().units);
      return this;
    }

    show()
    {
      this.view = new TimeLineView(this.getCollection().getSortUnits());
      this.view.render();
    }

    static removeFirst()
    {
      let wrapper = document.getElementById(TimeLineView.wrapperClassName);
      if (wrapper.hasChildNodes()) {
        wrapper.firstChild.remove();
      }
    }

    getQueue()
    {
      let Queue = new this.Queue(this._collection.toArray());
      return Queue.generateQueue();
    }
  }

  return TimeLine;
});
