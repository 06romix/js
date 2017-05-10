define(function () {

  function Tab(id, tabs) {
    var self = this;
    self.id = id;
    self.source = document.getElementById(id);
    self.article = null;
    self._nav = null;
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
      if (self.nav()) {
        self.nav().innerHTML = '';
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

  Tab.prototype = {
    nav: function (button) {
      if (!arguments.length) {
        if (this._nav === null) {
          this._nav = document.getElementById('right-nav');
        }
        return this._nav;
      }
      this._nav = button;
      return this;
    }
  };

  return Tab;
});
