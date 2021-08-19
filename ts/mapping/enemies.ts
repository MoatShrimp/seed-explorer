const enemies = {name:"", 
  assassin: {name:"assassin", difficulty: 7, rougeDifficulty: 5, max: 3, type: 1},
  bat: {name:"bat", difficulty: 4, rougeDifficulty: 4, canBeSolo: true, type: 1},
  bingBong: {name:"bingBong", difficulty: 15, rougeDifficulty: 6, max: 3, type: 3},
  bishFish: {name:"bishFish", difficulty: 3, rougeDifficulty: 3, max: 3, type: 1},
  bobo: {name:"bobo", difficulty: 5, rougeDifficulty: 5, max: 1, type: 3},
  bugLightning: {name:"bugLightning", difficulty: 3, rougeDifficulty: 3, type: 1},
  cauldron: {name:"cauldron", difficulty: 2, rougeDifficulty: 3, canBeSolo: true, type: 3},
  churchbell: {name:"churchbell", difficulty: 6, rougeDifficulty: 3, max: 2, type: 4},
  corruptedPilfer: {name:"corruptedPilfer", difficulty: 9, rougeDifficulty: 4, canBeSolo: true, type: 3},
  corruptedPilferBoss: {name:"corruptedPilferBoss", difficulty: 9, rougeDifficulty: 4, canBeSolo: true, type: 3},
  crossbowman: {name:"crossbowman", difficulty: 6, rougeDifficulty: 5, max: 2, type: 2},
  crystalAnt: {name:"crystalAnt", difficulty: 8, rougeDifficulty: 5, canBeSolo: true, type: 1},
  crystalFly: {name:"crystalFly", difficulty: 7, rougeDifficulty: 4, canBeSolo: true, type: 2},
  crystalSpider: {name:"crystalSpider", difficulty: 6, rougeDifficulty: 3, canBeSolo: true, type: 1},
  crystalWitch: {name:"crystalWitch", difficulty: 10, rougeDifficulty: 5, max: 2, type: 2},
  cursedJar: {name:"cursedJar", difficulty: 3, rougeDifficulty: 3, canBeSolo: true, type: 4},
  cursedJarWisp: {name:"cursedJarWisp", difficulty: 1, rougeDifficulty: 1, canBeSolo: true, type: 4},
  firebat: {name:"firebat", difficulty: 9, rougeDifficulty: 4, max: 2, type: 1},
  fireWitch: {name:"fireWitch", difficulty: 5, rougeDifficulty: 5, max: 1, type: 2},
  flyBloat: {name:"flyBloat", difficulty: 9, rougeDifficulty: 4, canBeSolo: true, type: 2},
  flyRanged: {name:"flyRanged", difficulty: 2, rougeDifficulty: 3, canBeSolo: true, type: 2},
  flyRanged02: {name:"flyRanged02", difficulty: 4, rougeDifficulty: 4, canBeSolo: true, type: 2},
  flyRanged03: {name:"flyRanged03", difficulty: 7, rougeDifficulty: 5, canBeSolo: true, type: 2},
  footman: {name:"footman", difficulty: 7, rougeDifficulty: 6, max: 2, type: 1},
  gargoyle: {name:"gargoyle", difficulty: 6, rougeDifficulty: 6, max: 2, type: 2},
  gargoyleStatue: {name:"gargoyleStatue", difficulty: 6, rougeDifficulty: 6, max: 2, type: 2},
  glimmerweed: {name:"glimmerweed", difficulty: 8, rougeDifficulty: 4, max: 3, canBeSolo: true, type: 6},
  goblinEngineer: {name:"goblinEngineer", difficulty: 5, rougeDifficulty: 4, max: 2, type: 4},
  goblinPoisonEngineer: {name:"goblinPoisonEngineer", difficulty: 14, rougeDifficulty: 5, max: 2, type: 4},
  goblinTickerEngineer: {name:"goblinTickerEngineer", difficulty: 11, rougeDifficulty: 6, max: 2, type: 4},
  golem: {name:"golem", difficulty: 9, rougeDifficulty: 6, max: 1, canBeSolo: true, type: 1},
  gremlin: {name:"gremlin", difficulty: 8, rougeDifficulty: 4, canBeSolo: true, type: 1},
  gremlinFiery: {name:"gremlinFiery", difficulty: 8, rougeDifficulty: 4, canBeSolo: true, type: 2},
  highPriest: {name:"highPriest", difficulty: 16, rougeDifficulty: 6, max: 2, type: 6},
  hobbleDoll: {name:"hobbleDoll", difficulty: 0, rougeDifficulty: 2, type: 0},
  jumperFire: {name:"jumperFire", difficulty: 3, rougeDifficulty: 3, canBeSolo: true, type: 3},
  jumperFireLarge: {name:"jumperFireLarge", difficulty: 6, rougeDifficulty: 4, canBeSolo: true, type: 3},
  jumperOli: {name:"jumperOil", difficulty: 3, rougeDifficulty: 3, canBeSolo: true, type: 3},
  jumperOliLarge: {name:"jumperOilLarge", difficulty: 6, rougeDifficulty: 4, canBeSolo: true, type: 3},
  jumperWater: {name:"jumperWater", difficulty: 3, rougeDifficulty: 3, canBeSolo: true, type: 3},
  jumperWaterLarge: {name:"jumperWaterLarge", difficulty: 6, rougeDifficulty: 4, canBeSolo: true, type: 3},
  lurkerBasic: {name:"lurkerBasic", difficulty: 4, rougeDifficulty: 4, max: 3, type: 2},
  lurkerCrypt: {name:"lurkerCrypt", difficulty: 7, rougeDifficulty: 4, max: 1, type: 2},
  lurkerCrystal: {name:"lurkerCrystal", difficulty: 10, rougeDifficulty: 5, max: 2, type: 2},
  magmaWormHead: {name:"magmaWormHead", difficulty: 13, rougeDifficulty: 5, canBeSolo: true, type: 2},
  mimicChest: {name:"mimicChest", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 3},
  mimicRareChest: {name:"mimicRareChest", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 3},
  mimicResourceChest: {name:"mimicResourceChest", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 3},
  minicChest: {name:"minicChest", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 3},
  necromancer: {name:"necromancer", difficulty: 12, rougeDifficulty: 7, max: 1, type: 6},
  nemesis: {name:"nemesis", difficulty: 10, rougeDifficulty: 10, type: 1},
  ogreAnnihilator: {name:"ogreAnnihilator", difficulty: 16, rougeDifficulty: 9, max: 2, type: 2},
  ogreBombardier: {name:"ogreBombardier", difficulty: 6, rougeDifficulty: 6, max: 2, type: 2},
  ogreFirebomber: {name:"ogreFirebomber", difficulty: 18, rougeDifficulty: 6, max: 2, type: 2},  
  pilferBasic: {name:"pilferBasic", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 0},
  pilferBomb: {name:"pilferBomb", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 0},
  pilferCrafting: {name:"pilferCrafting", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 0},
  pilferFat: {name:"pilferFat", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 0},
  pilferGolden: {name:"pilferGolden", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 0},
  pilferHunter: {name:"pilferHunter", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 0},
  poisonWormHead: {name:"poisonWormHead", difficulty: 15, rougeDifficulty: 7, max: 2, canBeSolo: true, type: 2},
  practiseDummy: {name:"practiseDummy", difficulty: 0, rougeDifficulty: 0, canBeSolo: true, type: 0},
  priest: {name:"priest", difficulty: 4, rougeDifficulty: 4, max: 2, type: 6},
  priestInnerFire: {name:"priestInnerFire", difficulty: 4, rougeDifficulty: 4, max: 1, type: 6},
  queenFish: {name:"queenFish", difficulty: 11, rougeDifficulty: 6, canBeSolo: true, type: 2},
  quilledGolem: {name:"quilledGolem", difficulty: 20, rougeDifficulty: 8, canBeSolo: true, type: 1},
  ratBasic: {name:"ratBasic", difficulty: 1, rougeDifficulty: 2, canBeSolo: true, type: 1},
  ratExploding: {name:"ratExploding", difficulty: 1, rougeDifficulty: 2, canBeSolo: true, type: 3},
  ratLarge: {name:"ratLarge", difficulty: 3, rougeDifficulty: 3, canBeSolo: true, type: 1},
  ratNest: {name:"ratNest", difficulty: 3, rougeDifficulty: 3, type: 4},
  ratTough: {name:"ratTough", difficulty: 4, rougeDifficulty: 4, canBeSolo: true, type: 1},
  rookFish: {name:"rookFish", difficulty: 3, rougeDifficulty: 3, max: 3, type: 2},
  sandwordLarvae: {name:"sandwordLarvae", difficulty: 1, rougeDifficulty: 1, canBeSolo: true, type: 1},
  scaleTunnel: {name:"scaleTunnel", difficulty: 18, rougeDifficulty: 8, type: 4},
  shaman: {name:"shaman", difficulty: 6, rougeDifficulty: 5, max: 2, type: 5},
  shaman02: {name:"shaman02", difficulty: 9, rougeDifficulty: 5, max: 2, type: 6},
  shaman03: {name:"shaman03", difficulty: 18, rougeDifficulty: 5, max: 2, type: 5},
  skeletonEnemyCrimson: {name:"skeletonEnemyCrimson", difficulty: 8, rougeDifficulty: 6, canBeSolo: true, type: 3},
  skeletonEnemyNorm: {name:"skeletonEnemyNorm", difficulty: 6, rougeDifficulty: 4, canBeSolo: true, type: 3},
  spiderBasic: {name:"spiderBasic", difficulty: 2, rougeDifficulty: 1, canBeSolo: true, type: 1},
  spiderWolf: {name:"spiderWolf", difficulty: 3, rougeDifficulty: 2, canBeSolo: true, type: 1},
  throwbo: {name:"throwbo", difficulty: 12, rougeDifficulty: 7, max: 1, type: 3},
  ticker: {name:"ticker", difficulty: 5, rougeDifficulty: 3, canBeSolo: true, type: 2},
  trollBombardier: {name:"trollBombardier", difficulty: 14, rougeDifficulty: 6, max: 2, type: 2},
  voodooDoll: {name:"voodooDoll", difficulty: 0, rougeDifficulty: 2, type: 0},
}