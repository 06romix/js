define(function () {
  class Collection {
    constructor()
    {
      this._items = {};
      this._itemsStatus = 0;
      this._arr = [];
      this._arrStatus = 0;
    }

    getItem(id)
    {
      return this._items.hasOwnProperty(id) ? this._items[id] : false;
    }

    addItem(Item)
    {
      if (this.hasItem(Item.id)) {
        console.error('Collection: Cannot set Item with same ID: ' + Item.id);
      } else {
        this._items[Item.id] = Item;
        ++this._itemsStatus;
      }
    }

    hasItem(key)
    {
      return key && this._items.hasOwnProperty(key);
    }

    isEmpty()
    {
      return !this.toArray().length
    }

    toArray()
    {
      if (this._arrStatus === this._itemsStatus) {
        return this._arr;
      }
      let arr = [];
      for (let key in this._items) {
        if (this._items.hasOwnProperty(key)) {
          let arrKey = key;
          switch (key.charAt(0)) {
            case 'b':
              arrKey = arrKey.replace('b', '10');
              break;
            case 'r':
              arrKey = arrKey.replace('r', '20');
              break;
          }
          arr[+arrKey] = this._items[key];
        }
      }
      return arr;
    }
  }

  return Collection;
});