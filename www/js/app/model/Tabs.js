define(['./Tab'], function (Tab) {

  function Tabs() {
    var self = this;
    self.tabs = {};
    self.curentTab = null;

    self.addTab = function (tab) {
      if (tab instanceof Tab) {
        self.tabs[tab.id] = tab;
      }
    };

    self.switch = function (id) {
      if (id !== self.curentTab) {
        for (var tabId in self.tabs) {
          if (tabId !== id && self.tabs.hasOwnProperty(tabId)) {
            self.tabs[tabId].clear();
          }
        }
        self.curentTab = id;
        return true;
      }
      return false;
    };
  }

  return new Tabs();
});