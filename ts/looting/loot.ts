enum rarity {
  common,
  uncommon,
  rare,
  legendary,
}

enum type {
  relic,
  consumable,
  blessing,
  curse,
}

interface Item {
  name:string;
  displayName:string;
  details:string;
  rarity: rarity;
  type: type;
  cost: number;
  craftingCost: number;
  active: boolean,
  found: number;
  maxFound: number;
  extra: Function,
}

interface ItemList {
  [guid:string]: Item;
}


interface LootTable {
  defaultLoot: {guid:string;};
  items: {weight:number; guid:string;}[];
};

interface Loot {
  tables: {
    [tableName:string]:LootTable;
  };
};

function looting () {};

const loot:Loot = new looting();
loot.tables = {};

class Looter {
  static tables:any = {};
  static items:ItemList;
  static seenItems:string[] = [];
  seed:number;
  randStates:Random[] = [];

  constructor(seed = 51113926) {
    this.seed = seed;
    for (const guid of Looter.seenItems) {
      Looter.items[guid].active = false;
    }
  }

  loot (tableName:string) {
    const table = Looter.tables[tableName];

    if (!this.randStates[table.randState]) {
      this.randStates[table.randState] = new Random(this.seed);
    }
    const rand = this.randStates[table.randState];
    
    const filtredTable = table.items.filter( item => Looter.items[item.guid].active );
    console.log(filtredTable);
    console.log(rand.state);
    const guid = rand.getWeightedTable(filtredTable).guid;
    const pickedItem = Looter.items[guid];

    if (pickedItem.maxFound >= pickedItem.found++) {
      pickedItem.active = false;
      Looter.seenItems.push(guid)
    }

    return pickedItem;    
  }

  getItem(name:string) {

    let id = name.toLowerCase();

    let item = Looter.items[id];
    let maybe = null;
    if (!item) {
      for(const [guid, value] of Object.entries(Looter.items)) {
        if (value.name.toLowerCase() === id || value.displayName.toLowerCase() === id)
          item = Looter.items[guid];
      }
    }
    if (!item) {
      for (let i = 0; i < id.length-2; ++i) {
        let shorter = id.substring(0,(id.length-i));
        for(const [guid, value] of Object.entries(Looter.items)) {
          if (value.name.toLowerCase().includes(shorter) ||
              value.displayName.toLowerCase().includes(shorter)) {
                maybe = value.name;
                break;
          }
        }
        shorter = id.substring(i,id.length);
        for(const [guid, value] of Object.entries(Looter.items)) {
          if (value.name.toLowerCase().includes(shorter) ||
              value.displayName.toLowerCase().includes(shorter)) {
                maybe = value.name;
                break;
          }
        }
        if (maybe) {
          break;
        }
      }
    }
    if (!item) {
      if(maybe) {
        console.log(`${name} not found, did you mean ${maybe}?`);
      }
      else {
        console.log(`${name} not found, and we found no close matches`);
      }
    }
    return item ?? false;     
  }
}


