define(['../core/Collection'], function (Collection) {
  class UnitCollection extends Collection
  {
    constructor() {
      super();
    }

    /**
     *
     * @param {UnitCollection} blueCollection
     * @param {UnitCollection} redCollection
     */
    static combineCollection(blueCollection, redCollection )
    {
      let collection = new UnitCollection();
      blueCollection.toArray().forEach(function (Item) {
        collection.addItem(Item);
      });
      redCollection.toArray().forEach(function (Item) {
        collection.addItem(Item);
      });
      return collection;
    }

    getSortUnits()
    {
      this._arr = this.toArray().sort(function (Unit1, Unit2) {
        return Unit1.initiative < Unit2.initiative;
      });
      return this._arr;
    }
  }

  return UnitCollection;
});