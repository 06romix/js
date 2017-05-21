/**
 * @module model/Abstract
 */
define(function () {

  class Abstract{
    constructor() {}

    getSide(type = 'large') {
      if ('short' === type) {
        return this._side.charAt(0);
      }
      return this._side;
    }

    static getInfoByDiv(divId) {
      let tdId = null;
      if (typeof tdId === 'object') {
        tdId = divId.parentNode.getAttribute('id');
        divId = divId.getAttribute('id');
      } else {
        tdId = document.getElementById(divId).parentNode.getAttribute('id');
      }
      return {id: divId, side: (String(divId).charAt(0) === 'b') ? 'blue' : 'red', pos: tdId};
    }
  }

  return Abstract;
});