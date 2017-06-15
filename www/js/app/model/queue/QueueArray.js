/**
 * @module model/queue/QueueArray
 */
define(function () {

  class QueueArray extends Array {
    constructor() {
      super();
    }

    first() {
      let result = true;
      this.every(function (item, id) {
        if (item instanceof QueueArray) {
          result = this[id].first();
        } else {
          result = item;
          delete this[id];
        }
        return result === true;
      }, this);

      return result;
    }
  }

  return QueueArray;
});
