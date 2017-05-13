define(function () {
  var colorType = 'color';
  // var colorType = 'black';
  return {
    w: {
      name: 'warrior',
      icon: colorType + '_' + 'warrior',
      hp: 100,
      dmg: 30,
      range: 1,
      mSpeed: 3,
    },
    a: {
      name: 'archer',
      icon: colorType + '_' + 'archer',
      hp: 75,
      dmg: 40,
      range: 4,
      mSpeed: 2,
    },
    m: {
      name: 'magic',
      icon: colorType + '_' + 'mage',
      hp: 50,
      dmg: 50,
      range: 2,
      mSpeed: 2,
    },
    t: {
      name: 'tank',
      icon: colorType + '_' + 'tank',
      hp: 150,
      dmg: 30,
      range: 1,
      mSpeed: 3,
    },
  };
});