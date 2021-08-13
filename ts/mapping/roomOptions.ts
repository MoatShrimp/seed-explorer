const enum direction {
  none,
  north,
  east,
  south,
  west,
  ne,
  ns,
  nw,
  nes,
  new,
  nsw,
  es,
  ew,
  esw,
  sw,
}

const enum icon {
  none,
  start,
  boss,
  exit,
  relicOn,
  altarOn,
  relicAltar,
  secret,
  exclamation,
  shopBR,
  shop,
  combat,
  new,
  hoody,
  fountain,
  exlamation,
}

const enum door {
  normal,
  iron,
  rock,
  crystal,
  locked,
  secret,
  hidden,
}

const roomOptions = {
  //common rooms
  begin: {
    icon: icon.start,
    sequence: [{
      stage:["small"],
      tags: "hoodie_entrance",
      direction: direction.north,
      requirements: (flag) => true,
    }],
  },    
  relic: {
    icon: icon.relicOn,
    door: door.locked,
    requirements: (f) => !f.itemFreedom,
  },
  relicUnlocked: {
    icon: icon.relicOn,
    requirements: (f) => !f.itemFreedom,
  },
  secret: {
    icon: icon.secret,
    door: door.secret,
    reqursion: 1,
    sequence: [{
      stage:["small", "large"],
      tags: "secret",
      chance: 0.25,
      requirements: (flag) => (
        flag.itemCircinus
      )
    }]
  },
  hidden: {
    door: door.hidden,
    subFloor:1,
  },
  altar: {
    icon: icon.altarOn,
    sequence: [{stage:["small"], tags: "altar_guacamole"}],
    weightedDoor: [
      {weight:1, door: door.normal},
      {weight:1, door: door.locked},
    ],
    requirements: (flag) => (
      flag.priestess_met > 2
    ),
  },
  altarLocked: {
    icon: icon.altarOn,
    sequence: [{stage:["small"], tags: "altar_guacamole"}],
    door: door.locked,
    requirements: (flag) => (
      flag.priestess_met > 2
    ),
  },
  altarGuacamole: {
    icon: icon.altarOn,
    door: door.locked,
    requirements: (flag) => (
      flag.guacamole
    ),
  },
  altarGuacamoleBug: {
    icon: icon.altarOn,
    door: door.locked,
    requirements: (flag) => (
      flag.guacamole > 2
    ),
  },
  altarAlt: {
    icon: icon.altarOn,
    sequence: [{
      stage:["small"],
      tags: "altar_guacamole",
      requirements: (flag) => (
        flag.guacamole > 2
      ),
    }],
    weightedDoor: [
      {weight:1, door: door.normal},
      {weight:1, door: door.locked},
    ],
    requirements: (flag) => (
      flag.priestess_met > 2
    ),
  },
  altarLockedAlt: {
    icon: icon.altarOn,
    sequence: [{
      stage:["small"],
      tags: "altar_guacamole",
      requirements: (flag) => (
        flag.guacamole > 2
      ),
    }],
    door: door.locked,
    requirements: (flag) => (
      flag.priestess_met > 2
    ),
  },
  altarGuacamoleAlt: {
    icon: icon.altarOn,
    door: door.locked,
    requirements: (flag) => (
      flag.priestess_met > 2
    ),
  },
  fountain: {
    icon: icon.fountain,
    requirements: (flag) => (
      flag.storyMode && 
      !flag.ribute_fountain_encountered && 
      flag.bog_unlocked
    ),
  },
  secretFountain: {
    icon: icon.fountain,
    requirements: (flag) => (
      flag.storyMode &&
      flag.bog_unlocked
    ),
  },
  bard: {
    requirements: (f) => !f.bard_met,
  },
  relicAltar: {
    icon: icon.relicAltar,
    upgrade: "relicAltar",
    requirements: (flag) => (
      !flag.altar_encountered &&
      !flag.whip_enabled
    ),
  },
  blackRabbitShop:{
    requirements: (flag) => (
      flag.black_rabbit_met > 0
    ),
  },
  secretShop: {
    icon: icon.shop,
    door: door.crystal,
    requirements: (flag) => (
      flag.peasant2_unlocked &&
      (flag.dibble_upgrade_count < 4) &&
      flag.storyMode
    ),
  },
  talismanSpawn: {
    requirements: (flag) => (
      flag.priestess_met > 2
    ),
  },
  bossRoom: {
    icon: icon.boss,
    requirements: (flag) => (
      flag.storyMode
    ),
  },
  nextAreaEntrance: {
    icon: icon.exit,
    noExit: direction.new,
    door: door.iron,						
    requirements: (flag) => (
      flag.storyMode
    ),
  },

  //shops
  undergroundMarket: {
    subFloor:1,
    sequence: [
      {tags: "market_baby"},
      {tags: "market_baby", direction: direction.east},
    ],
  },
  storeRoom: {
    subFloor:1,
    icon: icon.none,
    door: door.hidden,
    requirements: (flag) => (
      flag.rougeMode
    )
  },

  //hoodie rooms
  hoodieMineLocked: {
    icon: icon.hoody,
    requirements: (flag) => false && (
      flag.rockmimic_defeated && 
      flag.hoodie_met_mine && 
      (flag.floor_number == 1) && 
      flag.storyMode
    ),
  },
  hoodieMineUnlocked: {
    icon: icon.hoody,
    requirements: (flag) => false && (
      flag.rockmimic_defeated && 
      flag.hoodie_met_mine && 
      (flag.floor_number == 1) && 
      flag.storyMode
    ),
  },
  hoodieDungeonLocked: {
    door: door.crystal,
    requirements: (flag) => (
      !flag.hoodie_met_dungeon &&
      (flag.floor_number == 5) &&
      flag.storyMode
    ),
  },
  hoodieDungeonUnlocked: {
    icon: icon.hoody,
    requirements: (flag) => (
      flag.hoodie_met_dungeon &&
      (flag.floor_number == 5) &&
      flag.storyMode
    ),
  },
  hoodieHallLocked: {
    door: door.crystal,
    requirements: (flag) => (
      (!flag.hoodie_met_hall &&
      (flag.floor_number == 11) &&
      flag.storyMode) ?? false
    ),
  },
  hoodieHallUnlocked: {
    icon: icon.hoody,
    requirements: (flag) => (
      (flag.hoodie_met_hall &&
      (flag.floor_number == 11) &&
      flag.storyMode) ?? false
    ),
  },
  hoodieCavernLocked: {
    door: door.crystal,
    requirements: (flag) => (
      !flag.hoodie_met_cavern &&
      (flag.floor_number == 16) &&
      flag.storyMode
    ),
  },
  hoodieCavernUnlocked: {
    icon: icon.hoody,
    requirements: (flag) => (
      flag.hoodie_met_cavern &&
      (flag.floor_number == 16) &&
      flag.storyMode
    ),
  },

  //dogs
  dogShadow: {
    requirements: (flag) => (
      !flag.dog_shadow_found &&
      (flag.delve_count > 5) &&
      !flag.whip_enabled
    ),
  },
  dogEngine: {
    requirements: (flag) => (
      !flag.dog_engine_found &&
      (flag.delve_count > 6) &&
      !flag.whip_enabled
    ),
  },
  dogDillion: {
    requirements: (flag) => (
      !flag.dog_dillon_found &&
      (flag.delve_count > 7) &&
      !flag.whip_enabled
    ),
  },

  //mushroom quest
  alchemistApprentice0: {
    icon: icon.exclamation,
    requirements: (flag) => (
      !flag.apprentice_met && 
      flag.blacksmith_rescued && 
      !flag.whip_enabled && 
      flag.storyMode
    ),
  },
  alchemistApprentice3: {
    icon: icon.exclamation,
    requirements: (flag) => (
      (flag.apprentice_met == 4) && 
      flag.blacksmith_rescued && 
      !flag.whip_enabled && 
      flag.storyMode
    ),
  },
  mushroomPurple: {
    door: door.rock,
    requirements: (flag) => (
      !flag.mushroom_purple && 
      flag.apprentice_met && 
      !flag.whip_enabled && 
      flag.storyMode
    ),
  },
  mushroomGreen: {
    noExit: direction.north,
    door: door.rock,
    requirements: (flag) => (
      !flag.mushroom_green && 
      flag.apprentice_met && 
      !flag.whip_enabled && 
      flag.storyMode
    ),
  },
  mushroomBlue: {
    requirements: (flag) => (
      !flag.mushroom_blue && 
      flag.apprentice_met && 
      !flag.whip_enabled && 
      flag.storyMode
    ),
  },

  //priestess
  priestessEntrance: {
    sequence: [{tags: "priestesshall1"}],
    requirements: (flag) => (
      !flag.priestess_met &&
      !flag.whip_enabled &&
      flag.storyMode
    ),
  },
  priestessHall1: {
    noExit: direction.ew,
    requirements: (flag) => (
      !flag.whip_enabled &&
      flag.storyMode
    ),
  },
  priestessHall2: {
    noExit: direction.ew,
    requirements: (flag) => (
      !flag.whip_enabled &&
      flag.storyMode
    ),
  },
  priestessHall3: {
    noExit: direction.ew,
    requirements: (flag) => (
      !flag.whip_enabled &&
      flag.storyMode
    ),
  },
  priestessMain: {
    icon: icon.exclamation,
    noExit: direction.new,						
    requirements: (flag) => (
      !flag.peasant2_unlocked &&
      !flag.whip_enabled &&
      flag.storyMode
    )											
  },
  mastersKey: {
    icon: icon.boss,
    noExit: direction.new,						
    requirements: (flag) => (
      flag.priestess_met && !flag.masters_key && !flag.whip_enabled && flag.storyMode
    )											
  },

  //Bog Trials
  royalRoad:{
    icon: icon.secret,
    requirements: (flag) => (
      !flag.whip_enabled
    ),
  },
  royalRoadStart:{
    requirements: (flag) => (
      !flag.whip_enabled
    ),
    sequence: [
      {tags: "royal_road_1", direction: direction.east},
      {tags: "royal_road_2", direction: direction.north},
      {tags: "royal_road_3", direction: direction.west},
      {tags: "royal_road_4", direction: direction.north},
      {tags: "queen_room", direction: direction.north},
    ],
  },
  queensRoom:{
    requirements: (flag) => (
      !flag.whip_enabled
    ),
  },

  //tutorial
  tutorialBegin: {
    icon: icon.start,
		sequence: [{
      tags: "tutorial_secret",
      direction: direction.north
    }],
  },

  //special rooms Mines
  dodson: {
    icon: icon.exclamation,						
    requirements: (flag) => (
      !flag.peasant1_unlocked && 
      !flag.whip_enabled && 
      flag.storyMode
    ),
  },
  wayland: {
    requirements: (flag) => (
      (!flag.waylandBootsFound || !flag.blacksmith_rescued) && 
      !flag.whip_enabled && 
      flag.storyMode
    ),
  },
  blackRabbitFirst: {
    icon: icon.shopBR,
    noExit: direction.nsw,
    requirements: (flag) => (
      !flag.black_rabbit_met && 
      !flag.whip_enabled && 
      flag.storyMode
    ),
  },  
  treasureHunt: {
    noExit: direction.north,
    requirements: (flag) => (
      !flag.secret_treasure_note &&
      !flag.whip_enabled
    ),
  },
  ratFriendship: {
    tags: "mrrat",
    requirements: (flag) => (
      !flag.discoveredRatBond &&
      !flag.whip_enabled
    ),
  },  
  rockMimic:{					
    requirements: (flag) => (
      !flag.prisoner_key && 
      !flag.whip_enabled && 
      flag.storyMode
    ),
  },  
  dangerousToGo: {
    noExit: direction.new,
    requirements: (flag) => (
      flag.delve_count > 8
    ),
  },  

  //special rooms Dungeon
  dungeonEntrance: {
    icon: icon.exit,
    door: door.iron,						
    requirements: (flag) => (
      flag.storyMode
    ),
  },  
  dungeonLibrary: {
    door: door.locked,
    requirements: (flag) => (
      !flag.collector_book &&
      !flag.whip_enabled &&
      flag.storyMode
    ),
  },
  dibble: {
    icon: icon.exclamation,						
    noExit: direction.ew,
    sequence: [{tags: "store_room", direction: direction.north}],						
    requirements: (flag) => (
      !flag.peasant2_unlocked&& !flag.whip_enabled && flag.storyMode
    )											
  },
  dibblesStoreRoom: {
    icon: icon.exclamation,
    door: door.secret,
    requirements: (flag) => (
      !flag.peasant2_unlocked &&
      !flag.whip_enabled &&
      flag.storyMode
    ),
  },

  //special rooms Halls
  threeChests: {
    noExit: direction.new,
    requirements: (flag) => (
      flag.storyMode
    ),
  },
  hallLibrary: {
    icon: icon.exclamation,
    requirements: (flag) => (
      !flag.whip_enabled && flag.storyMode
    ),
  },
  pitSpikes: {
    sequence: [{
      tags: "hall_hidden_three_chests",
      direction: direction.east
    }],
  },
  secretEast: {
    noExit: direction.ns,
    sequence: [{
      stage:["small", "large"],
      tags: "secret",
      direction: direction.east
    }]
  },
  partyPopcornRoom: {
    requirements: (flag) => (
      flag.foundPartyPopcornPotion &&
      !flag.whip_enabled
    ),
  },
  hallLibraryCombat: {
    noExit: direction.ew,
    sequence: [{
      tags: "hall_library",
      direction: direction.north}],					
    requirements: (flag) => (
      !flag.collector_book &&
      !flag.whip_enabled &&
      flag.storyMode
    )											
  },

  //special rooms Cavern
  campsite: {
    sequence: [{
      tags: "hidden_hallway",
      direction: direction.north
    }]
	},

  //special rooms Core
  secretWest: {
    sequence: [{
      tags: "secret",
      direction: direction.west
    }]
	},
  maybeSecretEast: {
    sequence: [{
      tags: "secret",
      chance: 0.5,
      direction: direction.east
    }],
  },

}