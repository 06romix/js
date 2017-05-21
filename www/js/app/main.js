define(function (require) {
  let $ = require('jquery'),
    lib = require('./lib'),
    controller = require('./controller/Base'),
    Arena = require('./model/Arena'),
    Player = require('./model/Player'),
    Army = require('./model/Army'),
    tabs = require('./model/Tabs'),
    Tab = require('./model/Tab');

  tabs.addTab(new Tab('army-holder', tabs));
  tabs.addTab(new Tab('arena-holder', tabs));
  tabs.addTab(new Tab('spells-holder', tabs));

  let player1 = new Player(0, 'blue').init();
  let player2 = new Player(1, 'red').init();

  controller.setTabs(tabs);
  controller.player(player1);
  controller.player(player2);
  controller.setArena(Arena);
  controller.run();

  $(function () {
    $('#army').on('click', function () {
      controller.showArmy();
    });
    $('#play').on('click', function () {
      controller.showArena();
    });
    $('#spells').on('click', function () {
      controller.showSpells();
    });
  });
});
