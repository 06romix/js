define(function () {

  function Abstract() {
  }

  Abstract.prototype = {
    getSide: function () {
      return this._side;
    },

    getInfoByDiv: function (divId) {
      var tdId = null;
      if (typeof tdId == 'object') {
        tdId = divId.parentNode.getAttribute('id');
        divId = divId.getAttribute('id');
      } else {
        tdId = document.getElementById(divId).parentNode.getAttribute('id');
      }
      return {id: String(divId).charAt(1), side: (String(divId).charAt(0) == 'b') ? 'blue' : 'red', pos: tdId};
    }
  };

  return Abstract;
});