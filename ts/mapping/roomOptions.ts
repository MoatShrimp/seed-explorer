const weightedDoors = {
  altar: [{weight: 1, door: door.normal}, {weight: 1, door: door.locked}],
  shop: [{weight: 10, door: door.normal}, {weight: 7, door: door.locked}],
}
const roomOptions = {
  //common rooms
  begin: {
    icon: icon.start,
    sequence: rooms("hoodieTop"),
  },
  shop: {
    weightedDoor: weightedDoors.shop,
    requirements: conditions.storyMode,
  },
  relic: {
    icon: icon.relicOn,
    door: door.locked,
    requirements: conditions.noHexDesolation,
  },
  relicUnlocked: {
    icon: icon.relicOn,
    requirements: conditions.noHexDesolation,
  },
  secret: {
    icon: icon.secret,
    door: door.secret,
    reqursion: 1,
    sequence: rooms("circinus"),
  },
  hidden: {
    door: door.hidden,
    subFloor:1,
  },
  altar: {
    icon: icon.altarOn,
    sequence: rooms("guacamole"),
    weightedDoor: weightedDoors.altar,
    requirements: conditions.priestessRescued,
  },
  altarLocked: {
    icon: icon.altarOn,
    sequence: rooms("guacamole"),
    door: door.locked,
    requirements: conditions.priestessRescued,
  },
  altarGuacamole: {
    icon: icon.altarOn,
    door: door.locked,
    requirements: conditions.relicGuacamole,
  },
  altarGuacamoleBug: {
    icon: icon.altarOn,
    door: door.locked,
    requirements: conditions.relicGuacamoleBug,
  },
  altarAlt: {
    icon: icon.altarOn,
    sequence: rooms("guacamoleAlt"),
    weightedDoor: weightedDoors.altar,
    requirements: conditions.priestessRescued,
  },
  altarLockedAlt: {
    icon: icon.altarOn,
    equence: rooms("guacamoleAlt"),
    door: door.locked,
    requirements: conditions.priestessRescued,
  },
  altarGuacamoleAlt: {
    icon: icon.altarOn,
    door: door.locked,
    requirements: conditions.priestessRescued,
  },
  fountain: {
    icon: icon.fountain,
    requirements: conditions.noFountain,
  },
  secretFountain: {
    icon: icon.fountain,
    requirements: conditions.secretFountain,
  },
  bard: {
    requirements: conditions.notBardMet,
  },
  relicAltar: {
    icon: icon.relicAltar,
    upgrade: (flag) => flag.relicAltar = 1,
    requirements: conditions.relicAltar,
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
  },
  hoodieMineUnlocked: {
    icon: icon.hoody,
    requirements: conditions.hoodieMineU,
  },
  hoodieDungeonLocked: {
    door: door.crystal,
    requirements: conditions.hoodieDungeonL,
  },
  hoodieDungeonUnlocked: {
    icon: icon.hoody,
    requirements: conditions.hoodieDungeonU,
  },
  hoodieHallLocked: {
    door: door.crystal,
    requirements: conditions.hoodieHallL,
  },
  hoodieHallUnlocked: {
    icon: icon.hoody,
    requirements: conditions.hoodieHallU,
  },
  hoodieCavernLocked: {
    door: door.crystal,
    requirements: conditions.hoodieCavernL,
  },
  hoodieCavernUnlocked: {
    icon: icon.hoody,
    requirements: conditions.hoodieCavernU,
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
  },
  alchemistApprentice3: {
    icon: icon.exclamation,
    requirements: conditions.alchemistApprentice3,
  },
  mushroomPurple: {
    door: door.rock,
    requirements: conditions.mushroomPurple,
  },
  mushroomGreen: {
    noExit: direction.north,
    door: door.rock,
    requirements: conditions.mushroomGreen,
  },
  mushroomBlue: {
    requirements: conditions.mushroomBlue,
  },
  //priestess
  priestessEntrance: {
    sequence: rooms("priestesshall1"),
    requirements: conditions.priestessEntrance,
  },
  priestessHall1: {
    noExit: direction.ew,
    requirements: conditions.storyNotWhip,
  },
  priestessHall2: {
    noExit: direction.ew,
    requirements: conditions.storyNotWhip,
  },
  priestessHall3: {
    noExit: direction.ew,
    requirements: conditions.storyNotWhip,
  },
  priestessMain: {
    icon: icon.exclamation,
    noExit: direction.new,
    requirements: conditions.storyNotWhip,
  },
  mastersKey: {
    icon: icon.boss,
    noExit: direction.new,
    requirements: conditions.mastersKey,
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
  },
  wayland: {
    requirements: conditions.waylandShop,
  },
  blackRabbitFirst: {
    icon: icon.shopBR,
    noExit: direction.nsw,
    requirements: conditions.blackRabbitFirst,
  },
  treasureHunt: {
    noExit: direction.north,
    upgrade: (flag) => flag.secret_treasure_note = 1,
    requirements: conditions.treasureHunt,
  },
  ratFriendship: {
    tags: "mrrat",
    requirements: conditions.ratFriendship,
  },
  rockMimic:{
    requirements: conditions.rockMimic,
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
  },
  dibblesStoreRoom: {
    icon: icon.exclamation,
    door: door.secret,
    requirements: conditions.dibblesStoreRoom,
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