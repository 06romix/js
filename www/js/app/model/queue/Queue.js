/**
 * @module model/queue/Queue
 */
define(['./QueueItem', './QueueArray'], function (QueueItem, QueueArray) {

  class Queue {
    /**
     * @param {Unit[]} array
     */
    constructor(array)
    {
      /**
       * @type {QueueItem[]}
       * @private
       */
      this._units = [];
      array.forEach(function (Unit) {
        this._units.push(new QueueItem(Unit.toQueueObj()));
      }, this);

      // this._count = 0;
      /**
       * @type QueueArray
       */
      this._QueueArray = new QueueArray();
      this._queue = new QueueArray();
    }

    generateQueue()
    {
      this.prepareTimeSpan(1);
      return this._queue;
    }

    prepareTimeSpan(number)
    {
      this._units.forEach(function (QueueItem) {
        QueueItem.timeSpan = number;
        QueueItem.nextTimeSpan.forEach(function (timePosition) {
          if (this._queue.hasOwnProperty(timePosition)) {
            if (typeof this._queue[timePosition] === 'string') {
              let save = this._queue[timePosition];
              this._queue[timePosition] = this._QueueArray.slice(0);
              this._queue[timePosition].push(save);
              this._queue[timePosition].push(QueueItem.id);
            } else {
              this._queue[timePosition].push(QueueItem.id);
            }
          } else {
            this._queue[timePosition] = QueueItem.id;
          }
        }, this);
      }, this);
    }
  }

  return Queue;
});
