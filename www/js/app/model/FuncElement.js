define(function () {
  function FuncElement(element) {
    var self = this;
    self.source = element;

    self.getDataAttr = function (attr) {
      return self.source.getAttribute('data-' + attr);
    };

    self.id = self.source.getAttribute('id');
  }
  return FuncElement;
});