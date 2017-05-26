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
        if (typeof item === 'string') {
          result = item;
          delete this[id];
        } else {
          if (this[id]) {
            result = this[id].first();
          }
          if (result === true ) {
            return true;
          }
        }
        return false;
      }, this);

      if (result === true) {
        // console.log(this);
      }

      return result;
    }
  }

  return QueueArray;
});
