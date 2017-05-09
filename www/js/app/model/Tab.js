define(function () {

  function Tab(id, tabs) {
    var self = this;
    self.id = id;
    self.source = document.getElementById(id);
    self.article = null;
    self.tabs = tabs;
    self.tabs.addTab(self);

    self.getArticle = function () {
      var article = self.source.getElementsByTagName('article')[0];
      if (typeof article !== 'undefined') {
        self.article = article;
      }
      return self.article;
    };

    self.clear = function () {
      if (self.getArticle() !== null && self.getArticle().tagName === 'ARTICLE') {
        self.article.remove();
      }
      return self;
    };

    self.switch = function () {
      if (self.tabs.switch(self.id)) {
        self.article = document.createElement('article');
        self.source.appendChild(self.article);
        return self;
      }
      return false;
    };
  }

  return Tab;
});
