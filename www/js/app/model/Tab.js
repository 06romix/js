/**
 * @module model/Tab
 */
define(function () {

  class Tab {
    constructor(id, tabs) {
      this.id = id;
      this.source = document.getElementById(id);
      this.article = null;
      this._nav = null;
      this.tabs = tabs;
      this.tabs.addTab(this);
    }

    getArticle() {
      let article = this.source.getElementsByTagName('article')[0];
      if (typeof article !== 'undefined') {
        this.article = article;
      }
      return this.article;
    };

    clear() {
      if (this.getArticle() !== null && this.getArticle().tagName === 'ARTICLE') {
        this.article.remove();
      }
      if (this.nav()) {
        this.nav().innerHTML = '';
      }
      return this;
    };

    switchTab() {
      if (this.tabs.switchTab(this.id)) {
        this.article = document.createElement('article');
        this.source.appendChild(this.article);
        return this;
      }
      return false;
    }

    nav(button) {
      if (!arguments.length) {
        if (this._nav === null) {
          this._nav = document.getElementById('right-nav');
        }
        return this._nav;
      }
      this._nav = button;
      return this;
    }
  }

  return Tab;
});
