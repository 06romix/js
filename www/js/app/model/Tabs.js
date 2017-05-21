/**
 * @module model/Tabs
 */
define(['./Tab'], function (Tab) {

  class Tabs {
    constructor() {
      this.tabs = {};
      this.curentTab = null;
    }

    addTab(tab) {
      if (tab instanceof Tab) {
        this.tabs[tab.id] = tab;
      }
    }

    switchTab(id) {
      if (id !== this.curentTab) {
        for (let tabId in this.tabs) {
          if (tabId !== id && this.tabs.hasOwnProperty(tabId)) {
            this.tabs[tabId].clear();
          }
        }
        this.curentTab = id;
        return true;
      }
      return false;
    };
  }

  return new Tabs();
});