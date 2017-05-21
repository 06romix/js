define(['./Type'], function (Type) {
  class Types {
    constructor() {
      this.colorType = 'color';
    }

    getTypeInfo(type) {
      let types = {
        w: {
          name: 'warrior',
          icon: this.colorType + '_' + 'warrior',
          hp: 100,
          dmg: 30,
          range: 1,
          mSpeed: 4,
          initiative: 60,
        },
        a: {
          name: 'archer',
          icon: this.colorType + '_' + 'archer',
          hp: 75,
          dmg: 40,
          range: 5,
          mSpeed: 2,
          initiative: 50,
        },
        m: {
          name: 'magic',
          icon: this.colorType + '_' + 'mage',
          hp: 50,
          dmg: 50,
          range: 4,
          mSpeed: 2,
          initiative: 40,
        },
        t: {
          name: 'tank',
          icon: this.colorType + '_' + 'tank',
          hp: 150,
          dmg: 30,
          range: 1,
          mSpeed: 3,
          initiative: 30,
        },
      };
      return new Type(type, types[type]);
    }
  }

  return new Types();
});