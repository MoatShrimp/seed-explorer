const weightedDoors = {
  altar: [{weight: 1, door: door.normal}, {weight: 1, door: door.locked}],
  shop: [{weight: 10, door: door.normal}, {weight: 7, door: door.locked}],
}
const roomOptions = {
  //common rooms
  begin: {
    icon: icon.start,
    sequence: rooms("hoodieTop"),
    autoSpawn: 23,
  },
  shop: {
    weightedDoor: weightedDoors.shop,
    requirements: conditions.storyMode,
  },
  relic: {
    icon: icon.relicOn,
    door: door.locked,
    requirements: conditions.noHexDesolation,
    autoSpawn: 1,
  },
  relicUnlocked: {
    icon: icon.relicOn,
    requirements: conditions.noHexDesolation,
    autoSpawn: 1,
  },
  secret: {
    icon: icon.secret,
    door: door.secret,
    reqursion: 1,
    sequence: rooms("circinus"),
    autoSpawn: 7,
  },
  hidden: {
    door: door.hidden,
    subFloor:1,
    autoSpawn: 7,
  },
  altar: {
    icon: icon.altarOn,
    sequence: rooms("guacamole"),
    weightedDoor: weightedDoors.altar,
    autoSpawn: 7,
    requirements: conditions.priestessRescued,
  },
  altarLocked: {
    icon: icon.altarOn,
    sequence: rooms("guacamole"),
    door: door.locked,
    autoSpawn: 7,
    requirements: conditions.priestessRescued,
  },
  altarGuacamole: {
    icon: icon.altarOn,
    door: door.locked,
    autoSpawn: 7,
    requirements: conditions.relicGuacamole,
  },
  altarGuacamoleBug: {
    icon: icon.altarOn,
    door: door.locked,
    requirements: conditions.relicGuacamoleBug,
  },
  altarAlt: {
    icon: icon.altarOn,
    autoSpawn: 7,
    sequence: rooms("guacamoleAlt"),
    weightedDoor: weightedDoors.altar,
    requirements: conditions.priestessRescued,
  },
  altarLockedAlt: {
    icon: icon.altarOn,
    autoSpawn: 7,
    equence: rooms("guacamoleAlt"),
    door: door.locked,
    requirements: conditions.priestessRescued,
  },
  altarGuacamoleAlt: {
    icon: icon.altarOn,
    door: door.locked,
    autoSpawn: 7,
    requirements: conditions.priestessRescued,
  },
  fountain: {
    icon: icon.fountain,
    requirements: conditions.noFountain,
    autoSpawn: 7,
  },
  secretFountain: {
    icon: icon.fountain,
    requirements: conditions.secretFountain,
  },
  bard: {
    requirements: conditions.notBardMet,
    autoSpawn: 5,
  },
  relicAltar: {
    icon: icon.relicAltar,
    upgrade: (flag) => flag.relicAltar = 1,
    requirements: conditions.relicAltar,
    autoSpawn: 7,
  },
  blackRabbitShop:{
    requirements: conditions.blackRabbitMet,
  },
  secretShop: {
    icon: icon.shop,
    door: door.crystal,
    requirements: conditions.secretShop,
  },
  talismanSpawn: {
    requirements: conditions.priestessRescued,
  },
  bossRoom: {
    icon: icon.boss,
    requirements: conditions.storyMode,
  },
  nextAreaEntrance: {
    icon: icon.exit,
    noExit: direction.new,
    door: door.iron,
    requirements: conditions.storyMode,
  },
  //shops
  undergroundMarket: {
    subFloor:1,
    sequence: rooms("marketBaby"),
  },
  storeRoom: {
    subFloor:1,
    icon: icon.none,
    door: door.hidden,
    requirements: conditions.rougeMode,
  },
  //hoodie rooms
  hoodieMineLocked: {
    door: door.crystal,
    requirements: conditions.hoodieMineL,
    autoSpawn: 5,
  },
  hoodieMineUnlocked: {
    icon: icon.hoody,
    requirements: conditions.hoodieMineU,
    autoSpawn: 5,
  },
  hoodieDungeonLocked: {
    door: door.crystal,
    requirements: conditions.hoodieDungeonL,
    autoSpawn: 5,
  },
  hoodieDungeonUnlocked: {
    icon: icon.hoody,
    requirements: conditions.hoodieDungeonU,
    autoSpawn: 5,
  },
  hoodieHallLocked: {
    door: door.crystal,
    requirements: conditions.hoodieHallL,
    autoSpawn: 5,
  },
  hoodieHallUnlocked: {
    icon: icon.hoody,
    requirements: conditions.hoodieHallU,
    autoSpawn: 5,
  },
  hoodieCavernLocked: {
    door: door.crystal,
    requirements: conditions.hoodieCavernL,
    autoSpawn: 5,
  },
  hoodieCavernUnlocked: {
    icon: icon.hoody,
    requirements: conditions.hoodieCavernU,
    autoSpawn: 5,
  },
  //dogs
  dogShadow: {
    requirements: conditions.dogShadow,
  },
  dogEngine: {
    requirements: conditions.dogEngine,
  },
  dogDillion: {
    requirements: conditions.dogDillion,
  },
  //mushroom quest
  alchemistApprentice0: {
    icon: icon.exclamation,
    requirements: conditions.alchemistApprentice0,
    autoSpawn: 31,
  },
  alchemistApprentice3: {
    icon: icon.exclamation,
    requirements: conditions.alchemistApprentice3,
    autoSpawn: 31,
  },
  mushroomPurple: {
    door: door.rock,
    requirements: conditions.mushroomPurple,
    autoSpawn: 7,
  },
  mushroomGreen: {
    noExit: direction.north,
    door: door.rock,
    requirements: conditions.mushroomGreen,
  },
  mushroomBlue: {
    requirements: conditions.mushroomBlue,
    autoSpawn: 7,
  },
  //priestess
  priestessEntrance: {
    sequence: rooms("priestesshall1"),
    requirements: conditions.priestessEntrance,
    autoSpawn: 6,
  },
  priestessHall1: {
    noExit: direction.ew,
    requirements: conditions.storyNotWhip,
    autoSpawn: 6,
  },
  priestessHall2: {
    noExit: direction.ew,
    requirements: conditions.storyNotWhip,
    autoSpawn: 6,
  },
  priestessHall3: {
    noExit: direction.ew,
    requirements: conditions.storyNotWhip,
    autoSpawn: 6,
  },
  priestessMain: {
    icon: icon.exclamation,
    noExit: direction.new,
    requirements: conditions.storyNotWhip,
    autoSpawn: 6,
  },
  mastersKey: {
    icon: icon.boss,
    noExit: direction.new,
    requirements: conditions.mastersKey,
    autoSpawn: 6,
  },
  //Bog Trials
  royalRoad:{
    icon: icon.secret,
    requirements: conditions.notWhip,
  },
  royalRoadStart:{
    requirements: conditions.notWhip,
    sequence: rooms("royalRoad1", "royalRoad2", "royalRoad3", "royalRoad4", "queenRoom",),
  },
  queensRoom:{
    requirements: conditions.notWhip,
  },
  //tutorial
  tutorialBegin: {
    icon: icon.start,
    sequence: rooms("tuSecret"),
  },
  //special rooms Mines
  dodson: {
    icon: icon.exclamation,
    requirements: conditions.dodsonNotRescued,
    autoSpawn: 1,
  },
  wayland: {
    requirements: conditions.waylandShop,
    autoSpawn: 1,
  },
  blackRabbitFirst: {
    icon: icon.shopBR,
    noExit: direction.nsw,
    requirements: conditions.blackRabbitFirst,
    autoSpawn: 5
  },
  treasureHunt: {
    noExit: direction.north,
    upgrade: (flag) => flag.secret_treasure_note = 1,
    requirements: conditions.treasureHunt,
    autoSpawn: 0,
  },
  ratFriendship: {
    tags: "mrrat",
    requirements: conditions.ratFriendship,
    autoSpawn: 3
  },
  rockMimic:{
    requirements: conditions.rockMimic,
    autoSpawn: 1,
  },
  dangerousToGo: {
    noExit: direction.new,
    requirements: conditions.dangerousToGo,
  },
  //special rooms Dungeon
  dungeonEntrance: {
    icon: icon.exit,
    door: door.iron,
    requirements: conditions.storyMode,
  },
  dungeonLibrary: {
    door: door.locked,
    requirements: conditions.dungeonLibrary,
  },
  dibble: {
    icon: icon.exclamation,
    noExit: direction.ew,
    sequence: rooms("storeRoom"),
    requirements: conditions.dibble,
    autoSpawn: 3,
  },
  dibblesStoreRoom: {
    icon: icon.exclamation,
    door: door.secret,
    requirements: conditions.dibblesStoreRoom,
    autoSpawn: 1,
  },
  kurtz: {
    tag: "kurtz",
    noExit: direction.ns,
    requirements: conditions.kurtz,
  },
  //special rooms Halls
  threeChests: {
    noExit: direction.new,
    requirements: conditions.storyMode,
  },
  hallLibrary: {
    icon: icon.exclamation,
    requirements: conditions.storyNotWhip,
  },
  pitSpikes: {
    sequence: rooms("threeChests"),
  },
  secretEast: {
    noExit: direction.ns,
    sequence: rooms("secretEast"),
  },
  partyPopcornRoom: {
    requirements: conditions.partyPopcornRoom,
  },
  hallLibraryCombat: {
    noExit: direction.ew,
    sequence: rooms("library"),
    requirements: conditions.hallLibraryCombat,
  },
  //special rooms Cavern
  campsite: {
    sequence: rooms("hiddenHallway"),
	},
  //special rooms Core
  secretWest: {
    sequence: rooms("secretWest"),
	},
  maybeSecretEast: {
    sequence: rooms("maybeSecretEast"),
  },
}