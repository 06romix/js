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

    static get wrapperClassName()
    {
      return 'time-line'
    }

    render()
    {
      document.getElementById('arena').parentNode.appendChild(this.toHtml());
    }

    toHtml()
    {
      let div = document.createElement('div');
      div.setAttribute('id', TimeLineView.wrapperClassName);
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
