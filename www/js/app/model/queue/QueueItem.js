/**
 * @module model/queue/QueueItem
 */
define(function () {

  class QueueItem {
    constructor({id, initiative})
    {
      /**
       * @var this QueueItem
       * @property {String} unitId
       * @property {Number} initiative
       */
      this._unitId       = id;
      this._initiative   = initiative;
      this._time         = 1;
      this._timeSpan     = 1;
      this._timePosition = [];
    }

    get id()
    {
      return this._unitId;
    }

    get nextTimeSpan()
    {
      let i = 1;
      while (this._time < 500 * this._timeSpan) {
        this._time = i++ * this._initiative;
        this._timePosition.push(this._time);
      }
      return this._timePosition;
    }

    set timeSpan(number)
    {
      this._timeSpan = number;
      return this;
    }
  }

  return QueueItem;
});
