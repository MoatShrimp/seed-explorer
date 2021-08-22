interface Room {
  stage:string[];
  tags:string;
  branchWeight?:number;
  requirements?:Function;
  chance?:number;
  floorChance?:Function;
  direction?:direction;
  doorCost?:string;
}

function rooms(...roomNames:string[]):Room[] {
  return roomNames.map(room => rooms.list[room]);
}

rooms.multi = function (...roomNames:string[]):Room[][] {
  return roomNames.map(room => [rooms.list[room]]);
}

rooms.list = {
  //beginning
  begin: {stage:["small"], tags:"begin", branchWeight: 1},
  //end down
  end: {stage:["small"], tags:"end", branchWeight: 1},
  //normal
  normalSmall: {stage:["small"], tags:"normal", branchWeight: 4,},
  normalLarge: {stage:["large"], tags:"normal", branchWeight: 4,},
  normal: {stage:["small", "large"], tags:"normal", branchWeight: 4,},  
  easy: {stage:["small"], tags:"easy", branchWeight: 4},
  //relic
  relic: {stage:["small"], tags:"relic"},
  relicUnlocked: {stage:["small"], tags:"relic_unlocked", branchWeight: 1},  
  relicExtraCost: {stage:["small"], tags:"relic", doorCost:"2 keys"},
  //altar rooms
  altar: {stage:["small"], tags:"altar", branchWeight: 1},
  altarNoBranch: {stage:["small"], tags:"altar",},
  guacamole: {stage:["small"], tags: "altar_guacamole"},
  guacamoleAlt: {stage:["small"], tags: "altar_guacamole", requirements: conditions.relicGuacamole,},
  //blackRabbit
  blackRabbit: {stage:["extra"], tags:"black_rabbit", chance: 0.5},
  //hoodie
  hoodieTop: {stage:["small"], tags: "hoodie_entrance", direction: direction.north},
  hoody: {stage:["extra"], tags:"hoody"},
  //secret
  secret: {stage:["small","large"], tags:"secret"},
  secretChance: {stage:["small","large"], tags:"secret", chance: 0.5, requirements: conditions.relicHat},
  circinus: {stage:["small", "large"], tags: "secret", chance: 0.25, requirements: conditions.relicCircinus},
  //treasure
  treasure: {stage:["small","large"], tags:"treasure", branchWeight: 1},
  treasureChance: {stage:["small","large"], tags:"treasure", chance: 0.5, requirements: conditions.relicWhip},
  treasureBasic: {stage:["small"], tags:"treasure_basic_encounters", branchWeight: 1},
  treasureBasicChance: {stage:["small","large"], tags:"treasure_basic_encounters", chance: 0.5, requirements: conditions.relicWhip},
  //hidden
  hidden: {stage:["small","large"], tags:"hidden"},
  //queen
  royalRoad0: {stage:["large"], tags:"royal_road_0", 
    floorChance: (floor) => (25 * (floor - 20))/100,
  },
  royalRoad1: {stage:["large"], tags: "royal_road_1", direction: direction.east},
  royalRoad2: {stage:["large"], tags: "royal_road_2", direction: direction.north},
  royalRoad3: {stage:["large"], tags: "royal_road_3", direction: direction.west},
  royalRoad4: {stage:["large"], tags: "royal_road_4", direction: direction.north},
  queenRoom: {stage:["large"], tags: "queen_room", direction: direction.north},
  //boss
  endBoss: {stage:["large"], tags:"down_boss", branchWeight: 1},
  bossRoom: {stage:["extra"], tags:"bossRoom"},
  //entrance next zone
  prechamber: {stage:["large"], tags:"pre_room", direction: 1},
  nextDown: {stage:["small"], tags:"next_entrance", direction: 1},
  bogPrechamber: {stage:["large"], tags:"", direction: 1},
  bogDown: {stage:["small"], tags:"next_entrance", direction: 1},
  bogPrechamberBug: {stage:["large"], tags:""},
  bogDownBug: {stage:["small"], tags:"next_entrance"},
  //shop
  shop: {stage:["extra"], tags:"shop", branchWeight: 1},
  shopExtraCost: {stage:["extra"], tags:"shop", branchWeight: 1, doorCost:"2 keys"},
  marketBaby: {stage:["extra"], tags: "market_baby"},
  marketBabyEast: {stage:["extra"], tags: "market_baby", direction: direction.east},
  //relicAltar
  relicAltar:{stage:["large"], tags:"relic_altar",
    floorChance: (floor) => (625 * (floor - Math.trunc(floor/5)))/10000,
  },
  relicAltarLastFloors:{stage:["large"], tags:"relic_altar",
    floorChance: (floor) => (625 * (floor - Math.trunc(floor/5) - 4))/10000,
  },
  fountain:{stage:["large"], tags:"tribute_fountain",
    floorChance: (floor) => (625 * (floor - Math.trunc(floor/5)))/10000,
  }, 
  //relicAltarLast:{},
  //mineTutorial
  tuBegin: {stage:["small"], tags:"begin_tutorial", branchWeight: 1},
  tuJump: {stage:["small"], tags:"tutorial_jump", direction: 2, branchWeight: 1},
  tuAttack: {stage:["small"], tags:"tutorial_attack", direction: 2, branchWeight: 1},
  tuBomb: {stage:["small"], tags:"tutorial_bomb", direction: 4, branchWeight: 1},
  tuThrow: {stage:["large"], tags:"tutorial_throw", direction: 1, branchWeight: 1},
  tuPilfer: {stage:["large"], tags:"tutorial_pilfer", direction: 4, branchWeight: 1},
  tuRelic: {stage:["small"], tags:"tutorial_relic", direction: 1, branchWeight: 1},
  tuEnd: {stage:["small"], tags:"end_tutorial", direction: 1, branchWeight: 1},
  tuSecret: {stage:["small"], tags:"tutorial_secret", direction: direction.north, branchWeight: 1},
  //Special rooms, Mine
  dodsonCage: {stage:["small"], tags:"DodsonCageEncounter,normal", branchWeight: 4},
  mimicFight: {stage:["large"], tags:"RockMimicEncounter,normal"},
  waylandHallway: {stage:["small"], tags:"waylandshophallway"},
  waylandShop: {stage:["small"], tags:"waylandshop", direction: 1},
  apprentice: {stage:["large"], tags:"mushroom_apprentice", branchWeight: 1,
    floorChance: (floor) => (3 + (2 * floor))/10,
  },
  mushroom: {stage:["small","large"], tags:"mushroom",
    floorChance: (floor) => (5 + floor)/10,
  },
  blackRabbitFirst: {stage:["small"], tags:"black_rabbit_first", branchWeight: 1},
  //Special rooms, Dungeon
  dibble: {stage:["large"], tags:"dibble", direction: 1},
  storeRoom: {stage:["small"], tags: "store_room", direction: direction.north},
  mastersKey: {stage:["large"], tags:"masters_key"},
  priestess: {stage:["small"], tags:"priestess"},
  priestesshall1: {stage:["large"], tags:"priestesshall1", direction: direction.north},
  priestesshall2: {stage:["large"], tags:"priestesshall2", direction: direction.north},
  priestesshall3: {stage:["large"], tags:"priestesshall3", direction: direction.north},
  priestessMain: {stage:["large"], tags:"priestess_main", direction: direction.north},

  //Special rooms, Hall
  libraryCombat: {stage:["large"], tags:"hall_library_combat_arena", branchWeight: 1},
  library: {stage:["small"], tags: "hall_library", direction: direction.north},
  threeChests: {stage:["small"], tags: "hall_hidden_three_chests", direction: direction.east},
  secretEast: {stage:["small", "large"], tags: "secret", direction: direction.east},
  //special rooms, Cavern
  hiddenHallway: {stage:["small"], tags: "hidden_hallway", direction: direction.north},
  hiddenCampsite: {stage:["small"], tags: "hidden_campsite", direction: direction.north},
  //special rooms, Core
  secretWest: {stage:["small", "large"], tags: "secret", direction: direction.west},
  maybeSecretEast: {stage:["small", "large"], tags: "secret", chance: 0.5, direction: direction.east},
}