define(function (require) {
    var $ = require('jquery'),
        lib = require('./lib'),
        controller = require('./controller/Base'),
        Arena = require('./model/Arena'),
        Army = require('./model/Army'),
        tabs = require('./model/Tabs'),
        Tab = require('./model/Tab'),
        blueConfig = require('./config/blue-army'),
        redConfig = require('./config/red-army');

    tabs.addTab(new Tab('army-holder', tabs));
    tabs.addTab(new Tab('arena-holder', tabs));
    tabs.addTab(new Tab('spells-holder', tabs));

    controller.setTabs(tabs);
    controller.setBlueArmy(new Army(blueConfig).collect());
    controller.setRedArmy(new Army(redConfig).collect());
    controller.setArena(Arena);
    controller.setInBattle(false);
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
