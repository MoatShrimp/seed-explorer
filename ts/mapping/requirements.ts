interface Requirements {
  [label: string]: Function;
}

const conditions:Requirements = {
  relicWhip: (flag) => flag.relicWhip ?? false,
  relicHat: (flag) => flag.relicHat ?? false,
  relicCircinus: (flag) => flag.relicCircinus ?? false,
  relicGuacamole: (flag) => flag.guacamole ?? false,
  relicGuacamoleBug: (flag) => (flag.guacamole > 2) ?? false,
  noHexDesolation: (flag) => !flag.hexDesolation ?? false,
  storyMode: (flag) => flag.storyMode,
  notWhip: (flag) => !flag.whip_enabled,
  storyNotWhip: (flag) => (!flag.whip_enabled && flag.storyMode) ?? false,
  rougeMode: (flag) => flag.rougeMode,
  //common rooms
  priestessRescued: (flag) => (flag.priestess_met > 2) ?? false,
  noFountain: (flag) => (flag.storyMode && !flag.tribute_fountain_encountered && flag.bog_unlocked) ?? false,
  secretFountain: (flag) => (flag.storyMode && flag.bog_unlocked) ?? false,
  notBardMet: (flag) => !flag.bard_met ?? false,
  relicAltar: (flag) => (!flag.altar_encountered && !flag.whip_enabled) ?? false,
  blackRabbitMet:(flag) => (flag.black_rabbit_met > 0) ?? false,
  secretShop: (flag) => (flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode) ?? false,
  talismanSpawn: (flag) => (flag.priestess_met > 2),
  bossRoom: (flag) => (flag.storyMode),
  nextAreaEntrance: (flag) => (flag.storyMode),
  //dogs
  dogShadow: (flag) => (!flag.dog_shadow_found && (flag.delve_count > 5) && !flag.whip_enabled) ?? false,
  dogEngine: (flag) => (!flag.dog_engine_found && (flag.delve_count > 6) && !flag.whip_enabled) ?? false,
  dogDillion: (flag) => (!flag.dog_dillon_found && (flag.delve_count > 7) && !flag.whip_enabled) ?? false,
  //apprentice
  alchemistApprentice0: (flag) => (!flag.apprentice_met && flag.blacksmith_rescued && !flag.whip_enabled && flag.storyMode) ?? false,
  alchemistApprentice3: (flag) => ((flag.apprentice_met == 4) && flag.blacksmith_rescued && !flag.whip_enabled && flag.storyMode) ?? false,
  mushroomGreen: (flag) => (!flag.mushroom_green && flag.apprentice_met && !flag.whip_enabled && flag.storyMode) ?? false,
  mushroomBlue: (flag) => (!flag.mushroom_blue && flag.apprentice_met && !flag.whip_enabled && flag.storyMode) ?? false,
  mushroomPurple: (flag) => (!flag.mushroom_purple && flag.apprentice_met && !flag.whip_enabled && flag.storyMode) ?? false,
  //hoodie
  hoodieMineL: (flag) => (flag.rockmimic_defeated && flag.hoodie_met_mine && (flag.floor_number == 1) && flag.storyMode) ?? false,
  hoodieMineU: (flag) => (flag.rockmimic_defeated &&flag.hoodie_met_mine && (flag.floor_number == 1) && flag.storyMode) ?? false,
  hoodieDungeonL: (flag) => (!flag.hoodie_met_dungeon && (flag.floor_number == 5) && flag.storyMode) ?? false,
  hoodieDungeonU: (flag) => (flag.hoodie_met_dungeon && (flag.floor_number == 5) && flag.storyMode) ?? false,
  hoodieHallL: (flag) => (!flag.hoodie_met_hall && (flag.floor_number == 11) && flag.storyMode) ?? false,
  hoodieHallU: (flag) => (flag.hoodie_met_hall && (flag.floor_number == 11) && flag.storyMode) ?? false,
  hoodieCavernL: (flag) => (!flag.hoodie_met_cavern && (flag.floor_number == 16) && flag.storyMode) ?? false,
  hoodieCavernU: (flag) => (flag.hoodie_met_cavern && (flag.floor_number == 16) && flag.storyMode) ?? false,
  //priestess
  priestessEntrance: (flag) => (!flag.priestess_met && !flag.whip_enabled && flag.storyMode) ?? false,
  mastersKey: (flag) => (flag.priestess_met && !flag.masters_key && !flag.whip_enabled && flag.storyMode) ?? false,
  //royal road
  royalRoad: (flag) => (!flag.whip_enabled) ?? false,
  royalRoadStart: (flag) => (!flag.whip_enabled) ?? false,
  queensRoom: (flag) => (!flag.whip_enabled) ?? false,
  //mines
  dodsonNotRescued: (flag) => (!flag.peasant1_unlocked && !flag.whip_enabled && flag.storyMode) ?? false,
  waylandShop: (flag) => ((!flag.discoveredWaylandBoots || !flag.blacksmith_rescued) && !flag.whip_enabled) ?? false,
  blackRabbitFirst: (flag) => (!flag.black_rabbit_met && !flag.whip_enabled && flag.storyMode) ?? false,
  treasureHunt: (flag) => (!flag.secret_treasure_note && !flag.whip_enabled) ?? false,
  ratFriendship: (flag) => (!flag.discoveredRatBond && !flag.whip_enabled) ?? false,
  rockMimic: (flag) => (!flag.prisoner_key && !flag.whip_enabled && flag.storyMode) ?? false,
  dangerousToGo: (flag) => (flag.delve_count > 8) ?? false,
  //dungeon
  dungeonEntrance: (flag) => (flag.storyMode) ?? false,
  dungeonLibrary: (flag) => (!flag.collector_book && !flag.whip_enabled && flag.storyMode) ?? false,
  dibble: (flag) => (!flag.peasant2_unlocked && !flag.whip_enabled && flag.storyMode) && false,
  dibblesStoreRoom: (flag) => (!flag.peasant2_unlocked && !flag.whip_enabled && flag.storyMode) ?? false,
  kurtz: (flag) => (flag.storyMode && (!flag.discoveredHungrySpirit || !flag.peasant4_unlocked)) ?? false,
  //hall
  threeChests:(flag) => (flag.storyMode) ?? false,
  hallLibrary: (flag) => (!flag.whip_enabled && flag.storyMode) ?? false,
  partyPopcornRoom: (flag) => (flag.foundPartyPopcornPotion && !flag.whip_enabled) ?? false,
  hallLibraryCombat: (flag) => (!flag.collector_book && !flag.whip_enabled && flag.storyMode) ?? false,
  //OtherMine
  storeRoom: (flag) => (flag.rougeMode) ?? false,
  //zone versions Mine
  tutorialIncomplete: (flag) => (
    !flag.tutorial_complete
  ) ?? false,
  tutorialComplete: (flag) => (
    !flag.rockmimic_defeated && 
    !flag.sandworm_defeated && 
    !flag.stonelord_defeated &&
    !flag.shadowlord_defeated
  ) ?? false,
  mimicKilled: (flag) => (
    flag.rockmimic_defeated &&
    !flag.sandworm_defeated && 
    !flag.stonelord_defeated &&
    !flag.shadowlord_defeated
  ) ?? false,
  mineSandwormKilled: (flag) => (
    flag.sandworm_defeated && 
    !flag.stonelord_defeated &&
    !flag.shadowlord_defeated
  ) ?? false,
  mineStonelordKilled: (flag) => (
    flag.stonelord_defeated &&
    !flag.shadowlord_defeated
  ) ?? false,
  mineShadowlordKilled: (flag) => (
    flag.shadowlord_defeated
  ) ?? false,
  //zone versions Rest
  allBossesAlive: (flag) => (
    !flag.sandworm_defeated && 
    !flag.stonelord_defeated &&
    !flag.shadowlord_defeated &&
    !flag.crystallord_defeated
  ) ?? false,
  sandwormKilled: (flag) => (
    flag.sandworm_defeated && 
    !flag.stonelord_defeated &&
    !flag.shadowlord_defeated &&
    !flag.crystallord_defeated
  ) ?? false,
  stonelordNotKilled: (flag) => (
    !flag.stonelord_defeated &&
    !flag.shadowlord_defeated &&
    !flag.crystallord_defeated
  ) ?? false,
  stonelordKilled: (flag) => (
    flag.stonelord_defeated &&
    !flag.shadowlord_defeated &&
    !flag.crystallord_defeated
  ) ?? false,
  shadowlordNotKilled: (flag) => (
    !flag.shadowlord_defeated &&
    !flag.crystallord_defeated
  ) ?? false,
  shadowlordKilled: (flag) => (
    flag.shadowlord_defeated &&
    !flag.crystallord_defeated
  ) ?? false,
  crystallordKilled: (flag) => (
    flag.crystallord_defeated
  ) ?? false,
  crystallordNotKilled: (flag) => (
    !flag.crystallord_defeated &&
    !flag.firelord_defeated &&
    !flag.enterBog
  ) ?? false,
  crystallordKilledNotFire: (flag) => (
    flag.crystallord_defeated &&
    !flag.firelord_defeated &&
    !flag.enterBog
  ) ?? false,
  firelordKilled: (flag) => (
    flag.firelord_defeated &&
    !flag.enterBog
  ) ?? false,
  enterBog: (flag) => (
    flag.enterBog
  ) ?? false,
}