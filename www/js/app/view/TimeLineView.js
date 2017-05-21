/**
 * @namespace app/view
 */
define(function () {

  class TimeLineView {
    /**
     * @constructor
     * @property {UnitCollection} UnitCollection
     */
    constructor(Array) {
      this._array = Array;
    }

    render()
    {
      document.getElementById('arena').parentNode.appendChild(this.toHtml());
    }

    toHtml()
    {
      let div = document.createElement('div');
      div.setAttribute('id', 'time-line');
      this._array.forEach(function (Item) {
        let item = document.createElement('div');
        item.className = 'item-' + Item.getSide();
        item.appendChild(Item.toHtml('data-'));
        div.appendChild(item);
      });
      return div;
    }
  }

  return TimeLineView;
});
