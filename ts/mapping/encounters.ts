//Format: [weight/tag, roomName, {options}]
const encounters = {
	mine: {
		extra: {
			special: {
				rooms: [
					{tag:"black_rabbit", name:"BlackRabbit"},					
					{tag:"bossRoom", name:"SandRoom"},
				]
			},
			shop: {
				rooms: [
					{weight:1, name:"Shop", ...roomOptions.shop},
				]
			},
			hoody: {
				rooms: [
					{weight:1, name:"sleepyHoodyRoom"},
				]
			},
		},
		small: {
			begin: {
				default: roomOptions.begin,
				rooms: [
					{weight:4, name:"begin"},
				]
			},
			easy: {
				rooms: [
					{weight:1, name:"Spinner"},
					{weight:1, name:"Spikes"},
					{weight:3, name:"Pillar", difficulty:[1, 0]},
					{weight:1, name:"Plain", difficulty:[1, 0]},
				]
			},
			normal: {
				default:{difficulty:[1, 0]},
				rooms: [
					{weight:3, name:"MineCart"},
					{weight:3, name:"Pillar"},
					{weight:3, name:"PillarHole"},
					{weight:3, name:"PillarSpinner"},
					{weight:3, name:"RockWall", difficulty:[1, -1]},
					{weight:3, name:"SouthNorthHole", prohibitedEnemies:["bobo"]},
					{weight:3, name:"StationarySpinners"},
					{weight:3, name:"BrokenCarts"},
					{weight:3, name:"StatueSpinner"},
					{weight:2, name:"Bridge", difficulty:[0.5, 0]},
					{weight:3, name:"EWSpinners", noExit: direction.ns, difficulty:[0.25, 0]},
					{weight:3, name:"CornerHoles", prohibitedEnemies:["bobo"]},
					{weight:3, name:"DualPillar"},
					{weight:3, name:"Spikes"},
					{weight:3, name:"SpikePatch"},
					{weight:3, name:"PillarSpawner", difficulty:[1, 1]},
					{weight:1, name:"SetPiece", difficulty:[1, -2]},
					{weight:2, name:"HoleEW", noExit: direction.ns, prohibitedEnemies:["bobo"]},
					{weight:2, name:"HoleEWSpinner", noExit: direction.ns, difficulty:[0, 0], prohibitedEnemies:["bobo"]},
					{weight:4, name:"Plain", difficulty:[1, 1]},
					{weight:2, name:"HazardHeavy", difficulty:[1, -2]},
					{weight:2, name:"DangerWalls", noExit: direction.ew},
					{weight:3, name:"TilePattern", difficulty:[1, 1]},
					{weight:3, name:"CornerRocks"},
					{weight:2, name:"RockPath"},
					{weight:3, name:"DiagonalHole", difficulty:[1, -2]},
					{weight:3, name:"CenterTorches"},
					{weight:2, name:"Ruins"},
					{weight:3, name:"Statues", prohibitedEnemies:["bobo"]},
					{weight:3, name:"LargeSpinnerTrack"},
				]
			},
			special: {
				rooms: [
					{tag:"DodsonCageEncounter", name:"DodsonCage", ...roomOptions.dodson},
					{tag:"waylandshop", name:"WaylandShop", ...roomOptions.wayland},
					{tag:"WaylandShopHallway", name:"WaylandShopHallway", ...roomOptions.wayland},
					{tag:"mushroom", name:"MushroomFamily", ...roomOptions.mushroomGreen},
					{tag:"mushroom", name:"MushroomFarm", ...roomOptions.mushroomBlue},
					{tag:"black_rabbit_first", name:"BlackRabbit", ...roomOptions.blackRabbitFirst},
					{tag:"hoodie_entrance", name:"Hoodie_Locked", ...roomOptions.hoodieMineLocked},
					{tag:"hoodie_entrance", name:"Hoodie_Unlocked", ...roomOptions.hoodieMineUnlocked},
					{tag:"tribute_fountain", name:"TributeFountain", ...roomOptions.fountain},
					{tag:"begin_tutorial", name:"Begin", ...roomOptions.tutorialBegin},
					{tag:"tutorial_jump", name:"Jump"},
					{tag:"tutorial_attack", name:"Attack"},
					{tag:"tutorial_bomb", name:"Bomb"},
					{tag:"tutorial_relic", name:"Relic"},
					{tag:"tutorial_secret", name:"Secret"},
					{tag:"end", name:"Normal", icon: icon.exit},
					{tag:"down_boss", name:"Boss", icon: icon.boss},
					{tag:"end_tutorial", name:"Tutorial", icon: icon.exit},
					{tag:"next_entrance", name:"DungeonEntrance", ...roomOptions.dungeonEntrance},					
				]
			},
			relic: {
				default: roomOptions.relic,
				rooms: [
					{weight:4, name:"Torches"},
					{weight:4, name:"Pots"},
					{weight:4, name:"Hole", noExit: direction.nes},
					{weight:1, name:"TorchPuzzle", noExit: direction.north},
					{weight:4, name:"Statues"},
				]
			},
			relic_unlocked: {
				default: roomOptions.relicUnlocked,
				rooms: [
					{weight:4, name:"Torches"},
					{weight:4, name:"Pots"},
					{weight:4, name:"Hole", noExit: direction.nes},
					{weight:1, name:"TorchPuzzle", noExit: direction.north},
					{weight:4, name:"Statues"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:4, name:"WaterChest"},
					{weight:4, name:"Carts"},
					{weight:1, name:"Altar"},
					{weight:3, name:"CursedTorch"},
					{weight:3, name:"Crystals"},
					{weight:4, name:"Chest"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:1, name:"Blessing"},
					{weight:3, name:"Items"},
					{weight:3, name:"Chest"},
					{weight:3, name:"ChestCommon"},
					{weight:3, name:"KeyBlock"},
					{weight:3, name:"Bombs"},
					{weight:10, name:"DogShadow", ...roomOptions.dogShadow},
					{weight:2, name:"LeverBlocks", noExit: direction.north},
					{weight:1, name:"Tent"},
					{weight:2, name:"Nugg"},
					{weight:3, name:"Bard", ...roomOptions.bard},
					{weight:3, name:"TributeFountain", ...roomOptions.secretFountain},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:3, name:"WaterChest"},
					{weight:3, name:"Carts"},
					{weight:1, name:"TreasureHunt", ...roomOptions.treasureHunt},
					{weight:1, name:"Altar"},
					{weight:2, name:"CursedTorch"},
					{weight:2, name:"CursedRelic"},
					{weight:3, name:"Crystals"},
					{weight:1, name:"Lab"},
					{weight:3, name:"Chest"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:1, name:"Blessing"},
					{weight:1, name:"Blessing02"},
					{weight:1, name:"ButchersRoom"},
					{weight:1, name:"RatFriendship", ...roomOptions.ratFriendship},
					{weight:3, name:"Chest"},
					{weight:2, name:"Bard", ...roomOptions.bard},
				]
			},
			treasure: {
				rooms: [
					{weight:3, name:"Skeleton", difficulty:[1, 0]},
					{weight:3, name:"Rocks", difficulty:[1, 0]},
					{weight:3, name:"Spikes", difficulty:[1, 0]},
					{weight:2, name:"HoleBridges", difficulty:[1, 0]},
					{weight:3, name:"LockedRocks", noExit: direction.south},
					{weight:2, name:"StatuePuzzle"},
					{weight:3, name:"LockedBlocks", noExit: direction.north},
					{weight:1, name:"CursedRelics", door: door.locked},
					{weight:3, name:"SpikeCage", difficulty:[1, -4]},
					{weight:3, name:"RockCage", difficulty:[1, -4]},
					{weight:1, name:"SpikeSacrifice"},
					{weight:2, name:"DiagonalRocks"},
					{weight:2, name:"HealthLever", noExit: direction.south},
					{weight:2, name:"Pillar", difficulty:[1, 0]},
				]
			},
			treasureBasic: {
				rooms: [
					{weight:1, name:"Skeleton", difficulty:[0.5, 0]},
					{weight:1, name:"Rocks", difficulty:[0.5, 0]},
					{weight:1, name:"Plain", difficulty:[0.5, 0]},
				]
			},
			altar: {
				default: roomOptions.altar,
				rooms: [
					{weight:2, name:"Torches"},
					{weight:2, name:"Statues"},
					{weight:2, name:"Bridges"},
					{weight:2, name:"Tiled", noExit: direction.south},
				]
			},
			altar_locked: {
				default: roomOptions.altarLocked,
				rooms: [
					{weight:2, name:"Torches"},
					{weight:2, name:"Statues"},
					{weight:2, name:"Bridges"},
					{weight:2, name:"Tiled", noExit: direction.south},
				]
			},
			altar_guacamole: {
				default: roomOptions.altarGuacamole,
				rooms: [
					{weight:2, name:"Torches"},
					{weight:2, name:"Statues"},
					{weight:2, name:"Bridges"},
					{weight:2, name:"Tiled", ...roomOptions.altarGuacamoleBug, noExit: direction.south},
				]
			},
		},
		large: {
			normal: {
				default:{difficulty:[1, 2]},
				rooms: [
					{weight:2, name:"RailStatues"},
					{weight:2, name:"LargeRail"},
					{weight:2, name:"HoleBridge"},
					{weight:2, name:"RailSnake"},
					{weight:2, name:"Staging"},
					{weight:2, name:"PillarRocks"},
					{weight:2, name:"SpikeDonut"},
					{weight:3, name:"RailBrideLoop", prohibitedEnemies:["bobo"]},
					{weight:3, name:"RailBridge", difficulty:[1, -6],
						enemies: [enemies.flyRanged, enemies.flyRanged02, enemies.bat,],},
					{weight:1, name:"OilBarrels"},
					{weight:2, name:"MineField", difficulty:[0.4, 2]},
					{weight:2, name:"Bridges", difficulty:[1, -2]},
					{weight:2, name:"Spikes"},
					{weight:3, name:"CornerNE", noExit: direction.sw, difficulty:[1, 0], prohibitedEnemies:["bobo"]},
					{weight:1, name:"LandBridgeNS", noExit: direction.ew, difficulty:[1, 0],
						enemies: [enemies.flyRanged,],},
					{weight:2, name:"DualPillars"},
					{weight:2, name:"SpikeBridge", noExit: direction.ns, difficulty:[0, 0],
						enemies: [enemies.flyRanged,],},
					{weight:3, name:"CornerSW", noExit: direction.ne, difficulty:[1, 0], prohibitedEnemies:["bobo"]},
					{weight:2, name:"RockCross"},
					{weight:2, name:"SlotHoles"},
					{weight:2, name:"RockColumns"},
					{weight:3, name:"ATrack"},
					{weight:3, name:"DynamicHole"},
					{weight:2, name:"TeeRocks"},
					{weight:3, name:"HoleArrows", difficulty:[1, 1]},
					{weight:1, name:"DualSetPiece"},
					{weight:3, name:"Arena", noExit: direction.ew},
					{weight:2, name:"ArenaTrack", noExit: direction.ew, difficulty:[1, 1]},
					{weight:2, name:"QuadPillars"},
					{weight:2, name:"RockArrowMaze"},
					{weight:2, name:"RailGuantlet", noExit: direction.ns, difficulty:[0.5, -2]},
					{weight:2, name:"HazardHeavy"},
					{weight:2, name:"ArrowGuantlet", difficulty:[1, -2]},
					{weight:2, name:"DonutSpinner", noExit: direction.ns, difficulty:[1, -2]},
					{weight:2, name:"CornerRocks", prohibitedEnemies:["jumperFire", "jumperOil", "jumperWater"]},
					{weight:2, name:"TeeJunction", noExit: direction.north},
					{weight:3, name:"CornerBridge"},
					{weight:3, name:"BridgeHole"},
					{weight:3, name:"BigRocks", prohibitedEnemies:["jumperFire", "jumperOil", "jumperWater"]},
					{weight:3, name:"TriangleRocks"},
					{weight:2, name:"SnakeBridge"},
					{weight:3, name:"RandomBlocks"},
					{weight:3, name:"Empty", difficulty:[1, 3]},
					{weight:4, name:"TwoSetPiece"},
					{weight:3, name:"Grassy", difficulty:[1, 3]},
					{weight:2, name:"FivePillars"},
					{weight:1, name:"SnakeTrack", difficulty:[1, 0]},
					{weight:3, name:"Torches"},
					{weight:2, name:"RailIslands", difficulty:[1, 0]},
					{weight:1, name:"MushroomGrowOp"},
				]
			},				
			special: {
				rooms: [
					{tag:"RockMimicEncounter", name:"RockMimic", ...roomOptions.rockMimic},
					{tag:"mushroom", name:"MushroomDarkness", ...roomOptions.mushroomPurple, difficulty:[1, 0]},
					{tag:"mushroom_apprentice", name:"AlchemistApprentice0", ...roomOptions.alchemistApprentice0},
					{tag:"mushroom_apprentice", name:"AlchemistApprentice3", ...roomOptions.alchemistApprentice3},
					{tag:"relic_altar", name:"RelicAltar", ...roomOptions.relicAltar},
					{tag:"tutorial_throw", name:"Throw", doorOverride: direction.east},
					{tag:"tutorial_pilfer", name:"Pilfer"},
					{tag:"pre_room", name:"BeforeDungeonEntrance", ...roomOptions.dungeonEntrance},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:5, name:"GrassChests"},
					{weight:1, name:"Altar"},
					{weight:5, name:"Blessing"},
					{weight:5, name:"BasicItems"},
					{weight:5, name:"Gold"},
					{weight:3, name:"BlackRabbitShop", ...roomOptions.blackRabbitShop},
					{weight:5, name:"Potion"},
					{weight:5, name:"Chest"},
					{weight:3, name:"CursedTorch"},
					{weight:1, name:"DangerousToGo", ...roomOptions.dangerousToGo},
					{weight:5, name:"SpikedFood"},
					{weight:3, name:"DoubleLockBlock", noExit: direction.north},
					{weight:4, name:"StatueBombPuzzle"},
					{weight:1, name:"Pillars"},
					{weight:1, name:"OilyBridge", noExit: direction.nes},
					{weight:1, name:"DarkMaze"},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:2, name:"LeverBlocks"},
					{weight:2, name:"GrassChests"},
					{weight:2, name:"TorchPuzzle"},
					{weight:2, name:"Keys"},
					{weight:2, name:"Potions"},
					{weight:1, name:"Blessing"},
					{weight:1, name:"Blessing02"},
					{weight:1, name:"CursedRelics"},
					{weight:1, name:"Altar", noExit: direction.north},
					{weight:2, name:"PressureTrap", noExit: direction.ne},
					{weight:2, name:"ChooseBlessing"},
					{weight:2, name:"BobosLair"},
					{weight:2, name:"CaveIn"},
					{weight:1, name:"Gap"},
				]
			},
			treasure: {
				rooms: [
					{weight:3, name:"ItemBlocks", difficulty:[0, -2]},
					{weight:3, name:"SpikedChest", noExit: direction.south, difficulty:[0, 1]},
					{weight:3, name:"HoleSpikeChest", noExit: direction.west, difficulty:[1, 0]},
					{weight:3, name:"TorchPuzzle", difficulty:[1, -2]},
					{weight:3, name:"SpikeRails", noExit: direction.new, difficulty:[0, -2]},
					{weight:3, name:"BridgePuzzle", noExit: direction.ns, difficulty:[0, -2]},
					{weight:3, name:"BombPuzzle", difficulty:[0, -2]},
					{weight:4, name:"JustSomeTreasure", noExit: direction.north},
					{weight:2, name:"LeverBridge", noExit: direction.west, difficulty:[0, -2]},
					{weight:3, name:"VerticalBridge", difficulty:[0, -2]},
					{weight:4, name:"Decision", noExit: direction.south, difficulty:[0, -2]},
					{weight:3, name:"HealthLever", difficulty:[0, -2]},
					{weight:5, name:"SecretShop", ...roomOptions.secretShop},
					{weight:2, name:"OilChest", difficulty:[0.5, -6]},
					{weight:2, name:"FireyChest"},
					{weight:2, name:"ElectrifiedChest"},
					{weight:4, name:"JustSomeTreasure02"},
					{weight:2, name:"Nexus"},
					{weight:1, name:"TwoBombsOneKey"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:2, name:"Choice"},
					{weight:2, name:"DoubleRail", difficulty:[0, -2]},
					{weight:1, name:"RockLock", difficulty:[0.5, -4]},
				]
			},
			challange: {
				rooms: [
					{weight:1, name:"GamblingRoom", icon: icon.shopBR},
					{weight:1, name:"Combat", icon: icon.combat},
				]
			},
		},
	},
	dungeon: {
		extra: {
			special: {
				rooms: [
					{tag:"hoody", name:"sleepyHoodyRoom"},
					{tag:"black_rabbit", name:"BlackRabbit"},
					{tag:"shop", name:"Shop"},
					{tag:"boss", name:"SandRoom"},
				]
			},
			shop: {
				rooms: [
					{weight:1, name:"Shop", ...roomOptions.shop},
				]
			},
		},
		small: {
			begin: {
				default: roomOptions.begin,
				rooms: [
					{weight:3, name:"Begin_Holes"},
					{weight:3, name:"Begin_Plain"},
					{weight:3, name:"Begin_Statues"},
					{weight:1, name:"Begin_Squeeze"},
					{weight:2, name:"Begin_Cells"},
				]
			},
			/*end: {
				rooms: [
					{weight:1, name:"End", icon: icon.exit, tag:"end"},
					{weight:1, name:"Boss", icon: icon.boss, tag: "endBoss"},
				]
			},*/
			normal: {
				default:{difficulty:[1, -2]},
				rooms: [
					{weight:3, name:"Spikes"},
					{weight:3, name:"LongHole"},
					{weight:3, name:"Pillars", noExit: direction.ew, difficulty:[1, 0]},
					{weight:3, name:"Water", difficulty:[1, 0]},
					{weight:3, name:"Torches", difficulty:[1, -1]},
					{weight:3, name:"DynamicPillar", difficulty:[1, -1]},
					{weight:1, name:"ArrowBridge", noExit: direction.ns, difficulty:[0, 0]},
					{weight:1, name:"FlamingArrows", noExit: direction.ew, difficulty:[0, 0]},
					{weight:3, name:"TallBlocks", difficulty:[1, 0]},
					{weight:1, name:"SetPiece"},
					{weight:2, name:"Track"},
					{weight:3, name:"Empty", difficulty:[1, 0]},
					{weight:3, name:"SmallBowTie", noExit: direction.ns, difficulty:[1, 0]},
					{weight:3, name:"RazorBlade", noExit: direction.ew, difficulty:[1, 0]},
					{weight:2, name:"VerticalHole", noExit: direction.ns, difficulty:[1, -6]},
				]
			},	
			special: {
				rooms: [
					{tag: "dungeon_entrance", name:"Entrance", ...roomOptions.dungeonEntrance},
					{tag: "store_room", name:"DibblesStoreRoom", ...roomOptions.dibblesStoreRoom},
					{tag: "dungeonlibrary", name:"Library", ...roomOptions.dungeonLibrary},
					{tag: "priestess", name:"PriestessEntrance", ...roomOptions.priestessEntrance},
					{tag: "hoodie_entrance", name:"Hoodie_Locked", ...roomOptions.hoodieDungeonLocked},
					{tag: "hoodie_entrance", name:"Hoodie_Unlocked", ...roomOptions.hoodieDungeonUnlocked},
					{tag: "tribute_fountain", name:"TributeFountain", ...roomOptions.fountain},
					{tag: "next_entrance", name:"HallEntrance", ...roomOptions.dungeonEntrance},
					{tag:"end", name:"Normal", icon: icon.exit},
					{tag:"endBoss", name:"Boss", icon: icon.boss},
					{tag: "down_boss", name:"Boss", icon: icon.boss},
				]
			},
			relic: {
				default: roomOptions.relic,
				rooms: [
					{weight:3, name:"Statues"},
					{weight:3, name:"Water"},
					{weight:2, name:"Pillars", noExit: direction.ew},
					{weight:3, name:"WindingBridge", noExit: direction.north},
					{weight:3, name:"Holes"},
				]
			},
			relic_unlocked: {
				default: roomOptions.relicUnlocked,
				rooms: [
					{weight:3, name:"Statues"},
					{weight:3, name:"Water"},
					{weight:2, name:"Pillars", noExit: direction.ew},
					{weight:3, name:"WindingBridge", noExit: direction.north},
					{weight:3, name:"Holes"},
				]
			},
			treasure: {
				rooms: [
					{weight:3, name:"StatueChest"},
					{weight:3, name:"CellNE", noExit: direction.ne},
					{weight:3, name:"CellsEW", noExit: direction.ew},
					{weight:3, name:"DiamondFloor"},
					{weight:3, name:"CellN", noExit: direction.north},
					{weight:3, name:"CellE", noExit: direction.nes},
					{weight:3, name:"CellW", noExit: direction.nsw},
					{weight:3, name:"BrickStatue"},
					{weight:3, name:"SpikedChest"},
					{weight:1, name:"SpikedHallwayW", noExit: direction.nsw},
					{weight:1, name:"SpikedHallwayE", noExit: direction.new},
					{weight:3, name:"Track"},
					{weight:1, name:"TinyRoom", noExit: direction.new},
					{weight:2, name:"HealthLever"},
					{weight:3, name:"JustAChest"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:5, name:"OpenedChest"},
					{weight:5, name:"WaterChest"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:3, name:"CursedTorch"},
					{weight:3, name:"BombStorage"},
					{weight:1, name:"Altar"},
					{weight:3, name:"StorageRoom"},
					{weight:3, name:"DualLevers"},
					{weight:5, name:"Potion"},
					{weight:1, name:"Blessing"},
					{weight:10, name:"DogEngine", ...roomOptions.dogEngine},
					{weight:3, name:"Talisman", ...roomOptions.talismanSpawn},
					{weight:2, name:"KeyPillar"},
					{weight:1, name:"BigChest"},
					{weight:2, name:"Nugg"},
					{weight:3, name:"Bard", ...roomOptions.bard},
					{weight:3, name:"TributeFountain", ...roomOptions.secretFountain},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:10, name:"Kurtz", ...roomOptions.kurtz},
					{weight:3, name:"DoubleChest"},
					{weight:3, name:"GoldStatue"},
					{weight:3, name:"WaterChest"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:3, name:"CursedTorch"},
					{weight:3, name:"BombStorage"},
					{weight:1, name:"TripleCursedChest"},
					{weight:1, name:"DoubleBlessing"},
					{weight:1, name:"Lab"},
					{weight:2, name:"CursedRelic"},
					{weight:1, name:"PyroLair"},
					{weight:3, name:"StatueChest"},
					{weight:3, name:"CostedLever"},
					{weight:1, name:"CursedRelic"},
					{weight:1, name:"FourBigChests"},
					{weight:2, name:"Bard"},
				]
			},			
			altar: {
				default: roomOptions.altar,
				rooms: [
					{weight:1, name:"Pillars"},
					{weight:1, name:"CellE"},
					{weight:1, name:"Statues"},
				]
			},
			altar_locked: {
				default: roomOptions.altarLocked,
				rooms: [
					{weight:1, name:"Pillars"},
					{weight:1, name:"CellE"},
					{weight:1, name:"Statues"},
				]
			},
			altar_guacamole: {
				default: roomOptions.altarLocked,
				rooms: [
					{weight:1, name:"Pillars"},
					{weight:1, name:"CellE"},
					{weight:1, name:"Statues"},
				]
			},
		},
		large: {
			normal: {
				default:{difficulty:[1, 2]},
				rooms: [
					{weight:3, name:"CenterTurret", difficulty:[1, 1]},
					{weight:3, name:"Flooded"},
					{weight:3, name:"DualPillar"},
					{weight:3, name:"SlotHoles", difficulty:[1, 0]},
					{weight:3, name:"CornerWater"},
					{weight:3, name:"BridgeEW", noExit: direction.ns, difficulty:[1, -2]},
					{weight:3, name:"BridgeNS", noExit: direction.ew, difficulty:[1, -2]},
					{weight:2, name:"BendNE", noExit: direction.sw, difficulty:[1, -2]},
					{weight:1, name:"BendNEPillar", noExit: direction.sw, difficulty:[1, -4]},
					{weight:2, name:"BendSW", noExit: direction.ne, difficulty:[1, -2]},
					{weight:1, name:"BendSWPillar", noExit: direction.ne, difficulty:[1, -4]},
					{weight:3, name:"BallChainDynamic"},
					{weight:3, name:"BallChain", difficulty:[1, -2]},
					{weight:3, name:"HolesBlocks"},
					{weight:3, name:"DynamicShape", difficulty:[1, 0]},
					{weight:3, name:"Cells", difficulty:[1, 0]},
					{weight:1, name:"Guantlet", noExit: direction.ns, difficulty:[0, 0]},
					{weight:1, name:"Furnace", difficulty:[1, -10]},
					{weight:1, name:"Turrets", difficulty:[0.5, -6]},
					{weight:3, name:"DynamicHole"},
					{weight:3, name:"Gutters"},
					{weight:3, name:"Blocks"},
					{weight:3, name:"Sewer"},
					{weight:3, name:"CornerTurrets", difficulty:[1, 0]},
					{weight:2, name:"SpikeStrip", noExit: direction.ns, difficulty:[1, -2]},
					{weight:3, name:"Cross"},
					{weight:3, name:"Ess", noExit: direction.ns, difficulty:[1, 0]},
					{weight:3, name:"DonutSpinner", difficulty:[1, -4]},
					{weight:3, name:"Plain", difficulty:[1, 3]},
					{weight:3, name:"HazardHeavy"},
					{weight:3, name:"Pools"},
					{weight:3, name:"ElBlocks"},
					{weight:3, name:"BowTie", noExit: direction.ns},
					{weight:3, name:"RazorBlade", noExit: direction.ew},
					{weight:2, name:"WestDiagonal", noExit: direction.west},
					{weight:2, name:"EastDiagonal", noExit: direction.east},
					{weight:1, name:"FireWitchHunt", difficulty:[1, -4]},
					{weight:1, name:"FurnacePart2", difficulty:[1, -5]},
					{weight:2, name:"SlidingWall"},
					{weight:2, name:"SlantedPillars"},
					{weight:2, name:"CornerSlants"},
					{weight:1, name:"SewerPart2", noExit: direction.ns, difficulty:[1, -8]},
					{weight:3, name:"SewerPart3", difficulty:[1, -4]},
					{weight:2, name:"SewerPart4", difficulty:[1, -4]},
					{weight:1, name:"VerticalHall", noExit: direction.ew, difficulty:[0, 0]},
					{weight:3, name:"CornerPillar"},
					{weight:3, name:"OffsetTurrets", difficulty:[1, -2]},
					{weight:2, name:"MorningStarBridge", noExit: direction.north, difficulty:[0, 0]},
				]
			},
			treasure: {
				rooms: [
					{weight:4, name:"CornerTurrets"},
					{weight:4, name:"RockTurret"},
					{weight:4, name:"StatuePuzzle"},
					{weight:4, name:"CrystalHole", noExit: direction.ew},
					{weight:4, name:"TorchPuzzle", noExit: direction.ew},
					{weight:4, name:"DoubleCell", noExit: direction.new},
					{weight:4, name:"CellBlock", difficulty:[1, 0]},
					{weight:4, name:"SpikeSacrifice"},
					{weight:3, name:"SetPiece", difficulty:[1, 0]},
					{weight:2, name:"DoubleSetPiece", noExit: direction.north, difficulty:[1, -2]},
					{weight:4, name:"JustSomeTreasure"},
					{weight:3, name:"HealthLever"},
					{weight:3, name:"Guantlet"},
					{weight:5, name:"SecretShop", ...roomOptions.secretShop},
					{weight:3, name:"TurretDodging"},
					{weight:3, name:"BarrelTimer", noExit: direction.sw, difficulty:[1, -6]},
					{weight:1, name:"BladeBridge"},
					{weight:2, name:"Choice"},
					{weight:1, name:"SpikeWave", noExit: direction.west},
					{weight:1, name:"StoreHouse"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:1, name:"Altar"},
					{weight:3, name:"BlackRabbitShop", ...roomOptions.blackRabbitShop},
					{weight:5, name:"Chest"},
					{weight:5, name:"TorchPuzzle"},
					{weight:5, name:"Cells"},
					{weight:5, name:"Chest02"},
					{weight:5, name:"Gold"},
					{weight:4, name:"Bombs"},
					{weight:4, name:"Keys"},
					{weight:1, name:"Blessing"},
					{weight:4, name:"ChestItem"},
					{weight:3, name:"Talisman", ...roomOptions.talismanSpawn},
					{weight:1, name:"Garden", noExit: direction.esw},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:1, name:"AltarCell"},
					{weight:2, name:"WaterChest"},
					{weight:1, name:"Altar"},
					{weight:2, name:"ItemRocks"},
					{weight:2, name:"TorchPuzzle"},
					{weight:2, name:"Keys"},
					{weight:2, name:"Potions"},
					{weight:2, name:"DoubleWall"},
					{weight:1, name:"BlessingChoice"},
					{weight:2, name:"CellChests"},
					{weight:2, name:"DoubleLeverTrap"},
					{weight:2, name:"TorchTurretPuzzle"},
					{weight:2, name:"Gap"},
					{weight:2, name:"JumpTorchPuzzle"},
					{weight:1, name:"PressurePlate"},
					{weight:1, name:"Islands"},
				]
			},
			special: {
				rooms: [
					{tag:"dibble", name:"DibblesEmporium", ...roomOptions.hidden},
					{tag:"priestesshall1", name:"PriestessHall1", ...roomOptions.priestessHall1},
					{tag:"priestesshall2", name:"PriestessHall2", ...roomOptions.priestessHall2},
					{tag:"priestesshall3", name:"PriestessHall3", ...roomOptions.priestessHall3},
					{tag:"priestess_main", name:"Priestess", ...roomOptions.priestessMain},
					{tag:"masters_key", name:"MastersKey", ...roomOptions.mastersKey},
					{tag:"down_boss", name:"StonelordEntrance", ...roomOptions.bossRoom},
					{tag:"relic_altar", name:"RelicAltar", ...roomOptions.relicAltar},
					{tag:"pre_room", name:"BeforeHallEntrance", ...roomOptions.dungeonEntrance},
				]
			},		
			relic: {
				default: roomOptions.relic,
				rooms: [
					{weight:1, name:"Dungeon_Large_Relic_Torches"},
					{weight:1, name:"Dungeon_Large_Relic_Circle"},
					{weight:1, name:"Dungeon_Large_Relic_Cell"},
				]
			},
			unlocked: {
				default: roomOptions.relicUnlocked,
				rooms: [
					{weight:1, name:"Dungeon_Large_Relic_Torches"},
					{weight:1, name:"Dungeon_Large_Relic_Circle"},
					{weight:1, name:"Dungeon_Large_Relic_Cell"},
				]
			},
			challange: {
				rooms: [
					{weight:1, name:"GamblingRoom", icon: icon.shopBR},
					{weight:1, name:"Combat", icon: icon.combat},
				]
			},
		},
	},
	hall: {
		extra: {
			special: {
				rooms: [
					{tag:"hoody", name:"sleepyHoodyRoom"},
					{tag:"black_rabbit", name:"BlackRabbit"},
					{tag:"shop", name:"Shop"},
					{tag:"boss", name:"ShadowRoom"},
				]
			},
		},
		small: {
			begin: {
				default: roomOptions.begin,
				rooms: [
					{weight:1, name:"Holes"},
					{weight:1, name:"Statues"},
					{weight:1, name:"Water"},
					{weight:1, name:"Pillars"},
					{weight:1, name:"Pillars02"},
					{weight:1, name:"Torches"},
				]
			},
			/*end: {
				rooms: [
					{weight:1, name:"End", icon: icon.exit, tag:"end"},
					{weight:1, name:"Boss", icon: icon.boss, tag: "end_boss"},
				]
			},*/
			normal: {
				default:{difficulty:[1, -4]},
				rooms: [
					{weight:5, name:"OddWalls"},
					{weight:5, name:"Torches"},
					{weight:5, name:"CornerRocks"},
					{weight:5, name:"TallRocks"},
					{weight:5, name:"Empty"},
					{weight:5, name:"Corners"},
					{weight:5, name:"CenterHole"},
					{weight:4, name:"DiagonalRocks"},
					{weight:3, name:"BridgeEW", noExit: direction.ns, difficulty:[0, 0]},
					{weight:3, name:"BridgeNS", noExit: direction.ew, difficulty:[0, 0]},
					{weight:3, name:"TallRocksEast", noExit: direction.east},
					{weight:3, name:"TallRocksWest", noExit: direction.west},
					{weight:4, name:"BowTie", noExit: direction.ns},
					{weight:4, name:"HourGlass", noExit: direction.ew},
					{weight:5, name:"CornerBlocks"},
					{weight:2, name:"Track"},
					{weight:4, name:"CornerHoles"},
					{weight:3, name:"Crypt", difficulty:[1, 8]},
				]
			},	
			special: {
				rooms: [
					{tag:"hall_entrance", name:"Entrance", ...roomOptions.nextAreaEntrance},
					{tag:"hall_hidden_three_chests", name:"ThreeChests", ...roomOptions.threeChests},
					{tag:"hoodie_entrance", name:"Hoodie_Locked", ...roomOptions.hoodieHallLocked},
					{tag:"hoodie_entrance", name:"Hoodie_Unlocked", ...roomOptions.hoodieHallUnlocked},
					{tag:"hall_library", name:"Library", ...roomOptions.hallLibrary},
					{tag:"tribute_fountain", name:"TributeFountain", ...roomOptions.fountain},
					{tag:"next_entrance", name:"CavernEntrance", ...roomOptions.dungeonEntrance},
					{tag:"end", name:"Normal", icon: icon.exit},
					{tag:"endBoss", name:"Boss", icon: icon.boss},
				]
			},
			relic: {
				default: roomOptions.relic,
				rooms: [
					{weight:1, name:"Lanterns"},
					{weight:1, name:"Statues"},
					{weight:1, name:"Pillars"},
				]
			},
			relic_unlocked: {
				default: roomOptions.relicUnlocked,
				rooms: [
					{weight:1, name:"Lanterns"},
					{weight:1, name:"Statues"},
					{weight:1, name:"Pillars"},
				]
			},
			treasure: {
				rooms: [
					{weight:2, name:"SetPiece", difficulty:[0.4, -6]},
					{weight:3, name:"ChestSpawner"},
					{weight:3, name:"HalfEast", noExit: direction.west},
					{weight:3, name:"HalfWest", noExit: direction.east},
					{weight:3, name:"SpikeChest"},
					{weight:3, name:"SpinnerChest"},
					{weight:2, name:"HealthLever"},
					{weight:1, name:"CursedRelics"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:2, name:"OilSpikes"},
					{weight:3, name:"JustAChest"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:5, name:"Chest02"},
					{weight:5, name:"Skeletons"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:1, name:"Altar"},
					{weight:5, name:"Items"},
					{weight:3, name:"Keys"},
					{weight:5, name:"Chest"},
					{weight:3, name:"Bombs"},
					{weight:1, name:"Blessing"},
					{weight:5, name:"HealthLever"},
					{weight:3, name:"Gold"},
					{weight:2, name:"DualLevers"},
					{weight:3, name:"TorchLighting"},
					{weight:10, name:"DogDillon", ...roomOptions.dogDillion},
					{weight:3, name:"Talisman", ...roomOptions.talismanSpawn},
					{weight:2, name:"KeyPillar"},
					{weight:1, name:"BigChest"},
					{weight:2, name:"Nugg"},
					{weight:3, name:"Bard", ...roomOptions.bard},
					{weight:3, name:"TributeFountain", ...roomOptions.secretFountain},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:3, name:"Chest"},
					{weight:3, name:"Skeletons", noExit: direction.north},
					{weight:2, name:"CursedTorch", noExit: direction.north},
					{weight:3, name:"SpikeSacrifice"},
					{weight:1, name:"Altar"},
					{weight:1, name:"CursedPedestal", noExit: direction.ns},
					{weight:3, name:"ChestBridge", noExit: direction.es},
					{weight:1, name:"Lab"},
					{weight:2, name:"PitSpikes", ...roomOptions.pitSpikes},
					{weight:2, name:"Bard", ...roomOptions.bard},
					{weight:1, name:"OilBarricade"},
				]
			},		
			altar: {
				default: roomOptions.altar,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Holes"},
					{weight:1, name:"Gargoyles"},
				]
			},
			altar_locked: {
				default: roomOptions.altarLocked,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Holes"},
					{weight:1, name:"Gargoyles"},
				]
			},
			altar_guacamole: {
				default: roomOptions.altarGuacamole,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Holes"},
					{weight:1, name:"Gargoyles"},
				]
			},
		},
		large: {
			normal: {
				default:{difficulty:[1, 2]},
				rooms: [
					{weight:5, name:"RandomPillars"},
					{weight:5, name:"DonutHoles", difficulty:[1, -4]},
					{weight:4, name:"Crossroads", difficulty:[1, 0]},
					{weight:5, name:"TallRocks"},
					{weight:5, name:"ZigZag"},
					{weight:3, name:"SetPieces", difficulty:[1, 0]},
					{weight:3, name:"ArrowTraps", difficulty:[1, 0]},
					{weight:5, name:"Empty"},
					{weight:3, name:"ArrowMaze", difficulty:[1, 0]},
					{weight:2, name:"BendSW", direction: direction.ne, difficulty:[1, -4]},
					{weight:1, name:"BendSWPillar", direction: direction.ne, difficulty:[1, -6]},
					{weight:2, name:"BendSE", direction: direction.nw, difficulty:[1, -4]},
					{weight:1, name:"BendSEPillar", direction: direction.nw, difficulty:[1, -6]},
					{weight:2, name:"BendNW", direction: direction.es, difficulty:[1, -4]},
					{weight:1, name:"BendNWPillar", direction: direction.es, difficulty:[1, -6]},
					{weight:1, name:"BendNEPillar", direction: direction.sw, difficulty:[1, -6]},
					{weight:2, name:"BendNE", direction: direction.sw, difficulty:[1, -4]},
					{weight:5, name:"Arena"},
					{weight:3, name:"DeadlyDonut", direction: direction.ew, difficulty:[0, 0]},
					{weight:2, name:"Knot", difficulty:[1, -4]},
					{weight:2, name:"DonutSpinner", direction: direction.ns, difficulty:[1, -4]},
					{weight:3, name:"HazardHeavy"},
					{weight:2, name:"GargoyleHall", difficulty:[1, -4]},
					{weight:2, name:"EWBridgeThin", direction: direction.ns, difficulty:[0.8, -8]},
					{weight:3, name:"EWBridgeThick", direction: direction.ns, difficulty:[0.8, -10]},
					{weight:3, name:"SpiderDen"},
					{weight:4, name:"ChessBoard"},
					{weight:5, name:"CrossHole"},
					{weight:2, name:"ArrowFun", direction: direction.ns, difficulty:[1, -6]},
					{weight:5, name:"CornerPillars"},
					{weight:5, name:"CornerHoles"},
					{weight:4, name:"VerticalHoles"},
					{weight:3, name:"Pillars"},
					{weight:4, name:"SlidingWall", difficulty:[1, 0]},
					{weight:5, name:"CornerPillars"},
					{weight:1, name:"RandomWall", difficulty:[0, 0]},
					{weight:1, name:"Gargoyles", difficulty:[0, 0]},
				]
			},
			treasure: {
				rooms: [
					{weight:3, name:"CursedRelics", door: door.locked},
					{weight:3, name:"BridgeTorches", ...roomOptions.secretEast},
					{weight:4, name:"JustSomeTreasure", noExit: direction.north},
					{weight:4, name:"GargoylesMaybe"},
					{weight:4, name:"HealthLever"},
					{weight:3, name:"Eggs", noExit: direction.north},
					{weight:3, name:"SecretShop", ...roomOptions.secretShop},
					{weight:2, name:"SpikedRoom", noExit: direction.north},
					{weight:3, name:"Cage"},
					{weight:2, name:"Levers", noExit: direction.nes},
					{weight:1, name:"Choice"},
					{weight:1, name:"Skull"},
					{weight:2, name:"CursedJars", noExit: direction.south},
					{weight:1, name:"PilferLever"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:6, name:"Chest02"},
					{weight:6, name:"Chest"},
					{weight:4, name:"KeyBombMaze"},
					{weight:5, name:"Items"},
					{weight:5, name:"Keys"},
					{weight:5, name:"Bombs"},
					{weight:5, name:"Food"},
					{weight:4, name:"HealthLever"},
					{weight:3, name:"PuzzleLock"},
					{weight:2, name:"BlessingPool"},
					{weight:4, name:"Gold"},
					{weight:5, name:"Altar"},
					{weight:1, name:"SpaceInvader", ...roomOptions.partyPopcornRoom},
					{weight:3, name:"SpikeSacrifice"},
					{weight:3, name:"BombPuzzle"},
					{weight:4, name:"Talisman", ...roomOptions.talismanSpawn},
					{weight:2, name:"KeyPillars"},
					{weight:2, name:"BlackRabbitShop"},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:3, name:"SpikeJump"},
					{weight:2, name:"TorchPuzzle"},
					{weight:2, name:"Keys"},
					{weight:3, name:"Potions"},
					{weight:2, name:"Crypt"},
					{weight:1, name:"CursedRelics"},
					{weight:1, name:"BlessingChoice"},
					{weight:3, name:"ChessBoard"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:2, name:"SpiderGuantlet", difficulty:[1, -10]},
					{weight:1, name:"GargoyleGuards"},
					{weight:1, name:"SmallRoom", difficulty:[1, -10]},
					{weight:2, name:"Gap"},
					{weight:1, name:"DiagonalSpikes"},
					{weight:1, name:"Insulated"},
				]
			},
			special: {
				rooms: [
					{tag:"down_boss", name:"ShadowlordEntrance", ...roomOptions.bossRoom},
					{tag:"hall_library_combat_arena", name:"CombatWave", ...roomOptions.hallLibraryCombat},
					{tag:"relic_altar", name:"RelicAltar", ...roomOptions.relicAltar},
					{tag:"pre_room", name:"BeforeCavernEntrance", ...roomOptions.dungeonEntrance},
				]
			},
			challange: {
				rooms: [
					{weight:1, name:"GamblingRoom", icon: icon.shopBR},
					{weight:1, name:"Combat", icon: icon.combat},
				]
			},
		},
	},
	cavern: {
		extra: {
			special: {
				rooms: [
					{tag:"hoody", name:"sleepyHoodyRoom"},
					{tag:"black_rabbit", name:"BlackRabbit"},
					{tag:"shop", name:"Shop"},
					{tag:"boss", name:"CrystalRoom"},
				]
			},
		},
		small: {
			begin: {
				default: roomOptions.begin,
				rooms: [
					{weight:1, name:"Plain"},
					{weight:1, name:"PillarHole"},
					{weight:1, name:"Pillars"},
					{weight:1, name:"Round"},
				]
			},
			/*end: {
				rooms: [
					{weight:1, name:"End", icon: icon.exit, tag:"end"},
					{weight:1, name:"Boss", icon: icon.boss, tag: "end_boss"},
				]
			},*/
			normal: {
				default:{difficulty:[1, -8]},
				rooms: [
					{weight:3, name:"Empty"},
					{weight:3, name:"Corners"},
					{weight:3, name:"Donut"},
					{weight:3, name:"BowTie", noExit: direction.ns},
					{weight:3, name:"Razor", noExit: direction.ew},
					{weight:3, name:"Organic"},
					{weight:1, name:"HallwayEW", noExit: direction.ns},
					{weight:1, name:"HallwayNS", noExit: direction.ew},
					{weight:2, name:"NoWest", noExit: direction.west},
					{weight:2, name:"NoEast", noExit: direction.east},
					{weight:2, name:"NoNorth", noExit: direction.north},
					{weight:2, name:"NoSouth", noExit: direction.south},
					{weight:3, name:"HoleCorners"},
					{weight:3, name:"CenterHole"},
					{weight:2, name:"VerticalHole"},
					{weight:2, name:"ZPillars"},
					{weight:2, name:"SPillars"},
					{weight:2, name:"UPillar", noExit: direction.north},
					{weight:2, name:"VPillar", noExit: direction.north},
					{weight:2, name:"UPillarReverse", noExit: direction.south},
					{weight:2, name:"VPillarReverse", noExit: direction.south},
					{weight:2, name:"WestSlant", noExit: direction.west},
					{weight:2, name:"EastSlant", noExit: direction.east},
					{weight:3, name:"SpikePatch"},
				]
			},		
			special: {
				rooms: [
					{tag:"cavern_entrance", name:"Entrance", ...roomOptions.nextAreaEntrance},
					{tag:"hoodie_entrance", name:"Hoodie_Locked", ...roomOptions.hoodieCavernLocked},
					{tag:"hoodie_entrance", name:"Hoodie_Unlocked", ...roomOptions.hoodieCavernUnlocked},
					{tag:"hidden_campsite", name:"HiddenCampsite", door: door.rock},
					{tag:"hidden_hallway", name:"HiddenHallway", noExit: direction.ew},
					{tag:"tribute_fountain", name:"TributeFountain", ...roomOptions.fountain},
					{tag:"end", name:"Normal", icon: icon.exit},
					{tag:"endBoss", name:"Boss", icon: icon.boss},
					{tag:"next_entrance", name:"CoreEntrance", ...roomOptions.dungeonEntrance},
					{tag:"next_entrance_bog", name:"BogEntrance", ...roomOptions.dungeonEntrance},
				]
			},
			relic: {
				default: roomOptions.relic,
				rooms: [
					{weight:2, name:"ocked_Blocks"},
					{weight:2, name:"ocked_Round"},
					{weight:2, name:"Cavern_Small_Relic_Torches"},
					{weight:1, name:"Cavern_Small_Relic_Bridge"},
				]
			},
			relic_unlocked: {
				default: roomOptions.relicUnlocked,
				rooms: [
					{weight:2, name:"ocked_Blocks"},
					{weight:2, name:"ocked_Round"},
					{weight:2, name:"Cavern_Small_Relic_Torches"},
					{weight:1, name:"Cavern_Small_Relic_Bridge"},
				]
			},
			treasure: {
				rooms: [
					{weight:2, name:"JustTreasure"},
					{weight:2, name:"Spikes"},
					{weight:2, name:"DoubleRocked"},
					{weight:2, name:"ThiccRocks", noExit: direction.north},
					{weight:2, name:"JustTreasureHole"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:2, name:"HealthLever"},
					{weight:2, name:"Diagonal"},
					{weight:2, name:"TorchPuzzle"},
					{weight:2, name:"BombPuzzle"},
					{weight:2, name:"AChillSkeleton"},
					{weight:2, name:"ManySkeletons"},
					{weight:1, name:"CursedRelics"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:3, name:"Chest"},
					{weight:3, name:"SmallRoomChest", noExit: direction.new},
					{weight:3, name:"SpikeSacrifice"},
					{weight:1, name:"Altar"},
					{weight:2, name:"CursedTorch", noExit: direction.east},
					{weight:3, name:"SpikedFood"},
					{weight:3, name:"PlainChest"},
					{weight:3, name:"Bombs"},
					{weight:2, name:"KeyPillar"},
					{weight:3, name:"Keys"},
					{weight:1, name:"SWBlessing", noExit: direction.ne},
					{weight:1, name:"NEBlessing", noExit: direction.sw},
					{weight:1, name:"NothingHole"},
					{weight:2, name:"SneakyEast", noExit: direction.nsw},
					{weight:2, name:"BlackRabbitShop"},
					{weight:3, name:"GoldNug"},
					{weight:3, name:"Potion"},
					{weight:2, name:"Nugg"},
					{weight:3, name:"Bard", ...roomOptions.bard},
					{weight:3, name:"TributeFountain", ...roomOptions.secretFountain},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:3, name:"Chest02"},
					{weight:3, name:"Chest"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:3, name:"ResourceChests"},
					{weight:1, name:"CursedTorches"},
					{weight:3, name:"OvergrownChest"},
					{weight:1, name:"Altar"},
					{weight:1, name:"Lab"},
					{weight:1, name:"Blessing"},
					{weight:3, name:"Food"},
					{weight:2, name:"CostedLever"},
					{weight:3, name:"Bombs"},
					{weight:3, name:"Keyring"},
					{weight:1, name:"CampsiteHall", ...roomOptions.campsite},
					{weight:2, name:"Bard", ...roomOptions.bard},
				]
			},
			altar: {
				default: roomOptions.altar,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Holes"},
					{weight:1, name:"Overgrown"},
				]
			},
			altar_locked: {
				default: roomOptions.altarLocked,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Holes"},
					{weight:1, name:"Overgrown"},
				]
			},
			altar_guacamole: {
				default: roomOptions.altarGuacamole,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Holes"},
					{weight:1, name:"Overgrown"},
				]
			},
		},
		large: {
			normal: {
				default:{difficulty:[1, 2]},
				rooms: [
					{weight:4, name:"Empty"},
					{weight:4, name:"Corners01"},
					{weight:4, name:"Corners02"},
					{weight:4, name:"CenterPillar", difficulty:[1, -5]},
					{weight:5, name:"Corners03"},
					{weight:3, name:"HallwayEW", noExit: direction.ns, difficulty:[1, -5]},
					{weight:3, name:"HallwayNS", noExit: direction.ew, difficulty:[1, -5]},
					{weight:4, name:"CornerColumns", difficulty:[1, 0]},
					{weight:4, name:"UPillar", noExit: direction.north, difficulty:[1, 0]},
					{weight:4, name:"VPillar", noExit: direction.north, difficulty:[1, 0]},
					{weight:4, name:"UPillarReverse", noExit: direction.south},
					{weight:4, name:"VPillarReverse", noExit: direction.south, difficulty:[1, 0]},
					{weight:3, name:"ZPillar"},
					{weight:3, name:"SPillar"},
					{weight:3, name:"TriangleZPillar"},
					{weight:4, name:"CenterHole"},
					{weight:4, name:"VerticalHoles"},
					{weight:4, name:"DiamondHole", difficulty:[1, 0]},
					{weight:4, name:"FigureEight"},
					{weight:3, name:"WestSlant", noExit: direction.west, difficulty:[1, -2]},
					{weight:3, name:"EastSlant", noExit: direction.east, difficulty:[1, -2]},
					{weight:4, name:"Razor", noExit: direction.ew},
					{weight:4, name:"BowTie", noExit: direction.ns, difficulty:[1, -2]},
					{weight:2, name:"BendNW", noExit: direction.es, difficulty:[1, -8]},
					{weight:2, name:"BendNE", noExit: direction.ew, difficulty:[1, -8]},
					{weight:2, name:"BendSW", noExit: direction.ne, difficulty:[1, -8]},
					{weight:2, name:"BendSE", noExit: direction.nw, difficulty:[1, -8]},
					{weight:3, name:"Blocks"},
					{weight:4, name:"PrismStone"},
					{weight:3, name:"RockCage", difficulty:[1, 0]},
					{weight:4, name:"TwoLargeSetPiece", difficulty:[1, -2]},
					{weight:1, name:"NightmareScenario", difficulty:[1, -6]},
					{weight:3, name:"PrismRock", difficulty:[1, -6]},
					{weight:4, name:"VRock", difficulty:[1, 0]},
					{weight:4, name:"DoubleRock", difficulty:[1, 0]},
					{weight:4, name:"Separated"},
				]
			},
			treasure: {
				rooms: [				
					{weight:1, name:"CursedRelics", door: door.locked},
					{weight:3, name:"JustTreasure01"},
					{weight:3, name:"BlocksNRocks", noExit: direction.north},
					{weight:2, name:"HealthLever"},
					{weight:3, name:"BlockedBridge", noExit: direction.north},
					{weight:3, name:"BombPuzzle"},
					{weight:2, name:"LeverBombs", noExit: direction.north},
					{weight:3, name:"JustTreasure02", noExit: direction.nw},
					{weight:3, name:"BurriedStuff"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:2, name:"TorchPuzzle"},
					{weight:2, name:"CaveCells", noExit: direction.ew},
					{weight:3, name:"SecretShop", ...roomOptions.secretShop},
					{weight:2, name:"SpikePuzzle"},
					{weight:3, name:"BulletRocks"},
					{weight:3, name:"CoupleItems"},
					{weight:2, name:"WalkWithFire", noExit: direction.west},
					{weight:1, name:"Choice"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:3, name:"Chest"},
					{weight:3, name:"TallRocksChest"},
					{weight:3, name:"Chest"},
					{weight:2, name:"TorchPuzzle"},
					{weight:2, name:"OvergrownStatuePuzzle"},
					{weight:2, name:"3Chests", noExit: direction.north},
					{weight:1, name:"Blessing"},
					{weight:3, name:"Keys"},
					{weight:2, name:"KeyBlocks"},
					{weight:2, name:"TiledRoom"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:3, name:"Bombs"},
					{weight:2, name:"BlackRabbitShop"},
					{weight:3, name:"Chest"},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:2, name:"SpikeJump"},
					{weight:3, name:"BulletChest"},
					{weight:2, name:"Potions"},
					{weight:3, name:"Chests"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:1, name:"Blessing"},
					{weight:1, name:"Altar"},
					{weight:1, name:"DoubleBigChest"},
					{weight:3, name:"Small"},
					{weight:2, name:"Gap"},
					{weight:3, name:"TwoItems"},
				]
			},
			special: {
				rooms: [
					{tag:"down_boss", name:"PonzuEntrance", ...roomOptions.bossRoom},
					{tag:"relic_altar", name:"RelicAltar", ...roomOptions.relicAltar},
					{tag:"pre_room", name:"BeforeCoreEntrance", ...roomOptions.dungeonEntrance},
					{tag:"pre_bog", name:"BeforeBogEntrance", ...roomOptions.dungeonEntrance},
				]
			},
			challange: {
				rooms: [
					{weight:1, name:"GamblingRoom", icon: icon.shopBR},
					{weight:1, name:"Combat", icon: icon.combat},
				]
			},
		},
	},
	core: {
		extra: {
			special: {
				rooms: [
					{tag:"boss", name:"FireRoom"},
					{tag:"black_rabbit", name:"BlackRabbit"},
					{tag:"shop", name:"Shop"},
				]
			},
		},
		small: {
			begin: {
				default: roomOptions.begin,
				rooms: [
					{weight:1, name:"Plain"},
					{weight:1, name:"MoltenGold"},
					{weight:1, name:"Pillars"},
					{weight:1, name:"Holes"},
					{weight:1, name:"Blocks"},
				]
			},
			/*end: {
				rooms: [
					{weight:1, name:"End", icon: icon.exit, tag:"end"},
					{weight:1, name:"Boss", icon: icon.boss, tag: "end_boss"},
				]
			},*/
			normal: {
				default:{difficulty:[1, -15]},
				rooms: [
					{weight:5, name:"Empty"},
					{weight:4, name:"Corners"},
					{weight:4, name:"BowTie", noExit: direction.ns},
					{weight:4, name:"Razor", noExit: direction.ew},
					{weight:4, name:"Hole"},
					{weight:4, name:"Pillar"},
					{weight:4, name:"HoleNS"},
					{weight:4, name:"Spikes"},
					{weight:1, name:"VerticalHallHazard", noExit: direction.ew},
					{weight:3, name:"TSectionEast", noExit: direction.west},
					{weight:3, name:"TSectionWest", noExit: direction.east},
					{weight:3, name:"TSectionNorth", noExit: direction.south},
					{weight:3, name:"TSectionSouth", noExit: direction.north},
					{weight:2, name:"EastWestSpikes", noExit: direction.ns},
					{weight:3, name:"DiagonalHole"},
					{weight:2, name:"GoldPuddle"},
					{weight:2, name:"GoldPuddleNS"},
					{weight:1, name:"GoldPuddleCrossRoads"},
					{weight:4, name:"CentralPillar"},
					{weight:4, name:"Diamond"},
					{weight:3, name:"GoldRiver"},
					{weight:4, name:"MovingBlocks"},
					{weight:4, name:"MovingTorches"},
					{weight:3, name:"MovingVents"},
					{weight:3, name:"CornerRocks"},
					{weight:5, name:"Slant"},
					{weight:2, name:"BridgeEW", noExit: direction.ns},
				]
			},	
			special: {
				rooms: [
					{tag:"core_entrance", name:"Entrance", ...roomOptions.nextAreaEntrance},
					{tag:"end", name:"Normal", icon: icon.exit},
					{tag:"endBoss", name:"Boss", icon: icon.boss},
				]
			},
			relic: {
				default: roomOptions.relic,
				rooms: [
					{weight:1, name:"Blocks"},
					{weight:1, name:"GoldPool", noExit: direction.north},
					{weight:1, name:"Basic"},
					{weight:1, name:"TorchPuzzle"},
				]
			},
			relic_unlocked: {
				default: roomOptions.relicUnlocked,
				rooms: [
					{weight:1, name:"Blocks"},
					{weight:1, name:"GoldPool", noExit: direction.north},
					{weight:1, name:"Basic"},
					{weight:1, name:"TorchPuzzle"},
				]
			},
			treasure: {
				rooms: [
					{weight:4, name:"JustTreasure"},
					{weight:4, name:"GoldFlow", noExit: direction.north},
					{weight:3, name:"WestWall", noExit: direction.west},
					{weight:3, name:"EastWall", noExit: direction.east},
					{weight:3, name:"NorthWall", noExit: direction.north},
					{weight:3, name:"SouthWall", noExit: direction.south},
					{weight:3, name:"Spikes"},
					{weight:4, name:"Rocked"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:4, name:"BombPuzzle"},
					{weight:1, name:"CursedRelics"},
					{weight:3, name:"CrossBlock"},
					{weight:4, name:"LongReach", noExit: direction.west},
					{weight:4, name:"AlternateLongReach", noExit: direction.east},
					{weight:3, name:"GOLD", noExit: direction.north},
					{weight:3, name:"TreasureSwitch"},
					{weight:3, name:"DoubleChest"},
					{weight:3, name:"HealthLever"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:4, name:"Chest"},
					{weight:4, name:"Cookout"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:3, name:"GoldRoom"},
					{weight:3, name:"BombPuzzleSmall"},
					{weight:1, name:"Nuggs"},
					{weight:1, name:"Altar"},
					{weight:1, name:"LockedAltar", noExit: direction.north},
					{weight:3, name:"Insulated"},
					{weight:2, name:"Tent"},
					{weight:4, name:"Bombs"},
					{weight:4, name:"Keys"},
					{weight:3, name:"Blessing", noExit: direction.west},
					{weight:2, name:"PressurePlate", noExit: direction.ne},
					{weight:2, name:"GoldRocks"},
					{weight:2, name:"Bard", ...roomOptions.bard},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:4, name:"Chest"},
					{weight:3, name:"CursedTorch"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:4, name:"Chest02"},
					{weight:2, name:"SecretRoom", ...roomOptions.secretWest},
					{weight:2, name:"KeyPillar"},
					{weight:1, name:"Altar"},
					{weight:3, name:"Blessing"},
					{weight:4, name:"Item"},
					{weight:2, name:"Lab"},
					{weight:3, name:"SkeletonRocks"},
					{weight:4, name:"CookedFood"},
					{weight:2, name:"Bard", ...roomOptions.bard},
				]
			},	
			altar: {
				default: roomOptions.altarAlt,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Golden"},
					{weight:1, name:"Pillars"},
					{weight:1, name:"Flow", noExit: direction.east},
					{weight:1, name:"LongBridge", noExit: direction.nsw},
				]
			},
			altar_locked: {
				default: roomOptions.altarLocked,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Golden"},
					{weight:1, name:"Pillars"},
					{weight:1, name:"Flow", noExit: direction.east},
					{weight:1, name:"LongBridge", noExit: direction.nsw},
				]
			},
			altar_guacamole: {
				default: roomOptions.altarGuacamoleAlt,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Golden"},
					{weight:1, name:"Pillars"},
					{weight:1, name:"Flow", noExit: direction.east},
					{weight:1, name:"LongBridge", noExit: direction.nsw},
				]
			},
		},
		large: {
			normal: {
				default:{difficulty:[1, 2]},
				rooms: [
					{weight:4, name:"Empty"},
					{weight:4, name:"Corners"},
					{weight:3, name:"CentralPillar", difficulty:[1, 0]},
					{weight:3, name:"CornerHole", difficulty:[1, 0]},
					{weight:2, name:"NSBridge", noExit: direction.ew, difficulty:[1, -6]},
					{weight:2, name:"EWSBridge", noExit: direction.north, difficulty:[1, -4]},
					{weight:2, name:"EWNBridge", noExit: direction.south, difficulty:[1, -2]},
					{weight:4, name:"VerticalHole", difficulty:[1, 0]},
					{weight:3, name:"ZHole"},
					{weight:3, name:"GoldCorners"},
					{weight:3, name:"NorthLedge", noExit: direction.north, difficulty:[1, 0]},
					{weight:3, name:"SouthLedge", noExit: direction.south, difficulty:[1, 0]},
					{weight:4, name:"Cross"},
					{weight:3, name:"NECorner", noExit: direction.sw, difficulty:[1, -10]},
					{weight:3, name:"NWCorner", noExit: direction.es, difficulty:[1, -10]},
					{weight:3, name:"SECorner", noExit: direction.nw, difficulty:[1, -10]},
					{weight:3, name:"SWCorner", noExit: direction.ne, difficulty:[1, -10]},
					{weight:4, name:"CornerHoles"},
					{weight:2, name:"NSArena", noExit: direction.ew, difficulty:[1, 0]},
					{weight:2, name:"NSDonut", noExit: direction.ew, difficulty:[1, -4]},
					{weight:2, name:"SpikeBridgeEW", noExit: direction.ns, difficulty:[0, 0]},
					{weight:3, name:"NorthGoldPool", noExit: direction.north, difficulty:[1, -4]},
					{weight:3, name:"AlternateCross", difficulty:[1, 0]},
					{weight:3, name:"Quotes"},
					{weight:3, name:"GoldHotdogs", difficulty:[1, 0]},
					{weight:3, name:"GoldTriangle"},
					{weight:3, name:"GoldRiver", difficulty:[1, 0]},
					{weight:4, name:"VentSetpeice"},
					{weight:3, name:"Checkboard"},
					{weight:3, name:"SkeletonRockPuddle"},
					{weight:2, name:"RollerBridgeEW", noExit: direction.ns, difficulty:[0, 0]},
					{weight:3, name:"Snake", difficulty:[1, -2]},
					{weight:4, name:"SingleSetPiece"},
					{weight:2, name:"DoubleSetPiece", difficulty:[1, -9]},
					{weight:4, name:"RockTriangles", difficulty:[1, 0]},
					{weight:4, name:"CentralPillar"},
					{weight:4, name:"StubbyPillars"},
					{weight:3, name:"Ruins"},
					{weight:3, name:"SmallHoles", difficulty:[1, 0]},
					{weight:3, name:"ArrowMaze", difficulty:[0.5, -15]},
					{weight:3, name:"ThornPillars", difficulty:[1, 0]},
					{weight:4, name:"CornerVents"},
					{weight:2, name:"RollerHall", difficulty:[0, 0]},
					{weight:3, name:"GoldIsland", difficulty:[1, -4]},
					{weight:3, name:"CornerHall", difficulty:[1, 0]},
					{weight:4, name:"CornerPillar", difficulty:[1, 0]},
				]
			},	
			treasure: {
				rooms: [				
					{weight:4, name:"JustTreasure01"},
					{weight:4, name:"BombPuzzle"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:3, name:"Gold"},
					{weight:4, name:"JustTreasure02"},
					{weight:2, name:"River"},
					{weight:2, name:"TorchPuzzle"},
					{weight:2, name:"SecretShop", ...roomOptions.secretShop},
					{weight:3, name:"BridgeChest", noExit: direction.east},
					{weight:2, name:"HealthLever"},
					{weight:3, name:"RollerBridge", noExit: direction.north},
					{weight:3, name:"Rollers"},
					{weight:1, name:"CursedRelics"},
					{weight:4, name:"Items"},
					{weight:3, name:"Choice"},
					{weight:3, name:"DoubleSetPiece"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:4, name:"Chest"},
					{weight:2, name:"BlackRabbitShop"},
					{weight:3, name:"BurriedChests", noExit: direction.north},
					{weight:1, name:"Altar"},
					{weight:3, name:"TwoChests"},
					{weight:3, name:"SpikeSacrifice"},
					{weight:3, name:"Blessing"},
					{weight:3, name:"RollerBridge", noExit: direction.east},
					{weight:4, name:"RollerBidgeNSItems", noExit: direction.ew},
					{weight:3, name:"Gold"},
					{weight:2, name:"Talisman"},
					{weight:4, name:"Bombs"},
					{weight:3, name:"KeyBlocks", noExit: direction.south},
					{weight:4, name:"Chest02"},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:4, name:"GoldFlowEast"},
					{weight:4, name:"GoldFlowWest"},
					{weight:4, name:"GoldMoat"},
					{weight:3, name:"RockMaze"},
					{weight:3, name:"GoldLake"},
					{weight:2, name:"TinyRoom"},
					{weight:3, name:"RollerJumps"},
					{weight:3, name:"SmallSpikeSacrifice"},
					{weight:3, name:"RockedIn"},
					{weight:2, name:"Blessing"},
					{weight:1, name:"Altar"},
					{weight:3, name:"TorchPuzzle", ...roomOptions.maybeSecretEast},
					{weight:4, name:"Food"},
					{weight:4, name:"DoubleChestItem"},
				]
			},
			special: {
				rooms: [
					{tag:"down_boss", name:"SeerEntrance", ...roomOptions.bossRoom},
					{tag:"relic_altar", name:"RelicAltar", ...roomOptions.relicAltar},
					{tag:"end", name:"Normal", icon: icon.exit},
					{tag:"endBoss", name:"Boss", icon: icon.boss},
				]
			},
			challange: {
				rooms: [
					{weight:1, name:"GamblingRoom", icon: icon.shopBR},
					{weight:1, name:"Combat", icon: icon.combat},
				]
			},
		},
	},
	bog: {
		extra: {
			special: {
				rooms: [
					{tag:"boss", name:"PlunderRoom"},
					{tag:"black_rabbit", name:"BlackRabbit"},
					{tag:"shop", name:"Shop"},
				]
			},
		},
		small: {
			begin: {
				default: roomOptions.begin,
				rooms: [
					{weight:2, name:"Plain"},
					{weight:2, name:"Tiled"},
					{weight:2, name:"Statues"},
					{weight:2, name:"Holes"},
					{weight:2, name:"Ruins"},
					{weight:1, name:"PressurePlate"},
				]
			},
			/*end: {
				rooms: [
					{weight:1, name:"End", icon: icon.exit, tag:"end"},
					{weight:1, name:"Boss", icon: icon.boss, tag: "end_boss"},
				]
			},*/
			normal: {
				default:{difficulty:[1, -22]},
				rooms: [
					{weight:3, name:"Empty"},
					{weight:3, name:"Wet"},
					{weight:3, name:"CornerHoles"},
					{weight:3, name:"VariableCorners"},
					{weight:3, name:"StatuePond"},
					{weight:3, name:"DoubleStatue"},
					{weight:3, name:"Creek"},
					{weight:3, name:"RockCorners"},
					{weight:3, name:"LongHole"},
					{weight:3, name:"OffsetHoles"},
					{weight:3, name:"OffsetTallRocks", difficulty:[1, -30]},
					{weight:3, name:"Checkered"},
					{weight:3, name:"PileOfRocks"},
					{weight:3, name:"EastHole", difficulty:[1, -26]},
					{weight:3, name:"WestHole", difficulty:[1, -26]},
					{weight:3, name:"Creek"},
					{weight:3, name:"CrossHole", difficulty:[1, -26]},
					{weight:3, name:"Torches", difficulty:[1, -26]},
				]
			},
			special: {
				rooms: [
					{tag:"bog_entrance", name:"Entrance", ...roomOptions.nextAreaEntrance},
					{tag:"end", name:"Normal", icon: icon.exit},
					{tag:"endBoss", name:"Boss", icon: icon.boss},
				]
			},
			relic: {
				default: roomOptions.relic,
				rooms: [
					{weight:1, name:"Trees"},
					{weight:1, name:"Ruins"},
					{weight:1, name:"Water"},
					{weight:1, name:"Pillars", noExit: direction.south},
					{weight:1, name:"Torches"},
					{weight:1, name:"Bridge", noExit: direction.nsw},
				]
			},
			relic_unlocked: {
				default: roomOptions.relicUnlocked,
				rooms: [
					{weight:1, name:"Trees"},
					{weight:1, name:"Ruins"},
					{weight:1, name:"Water"},
					{weight:1, name:"Bridge", noExit: direction.nsw},				
					{weight:1, name:"Torches"},
					{weight:1, name:"Pillars", noExit: direction.south},
				
				]
				
			},
			treasure: {
				rooms: [
					{weight:3, name:"JustTreasure"},
					{weight:3, name:"JustTreasure02"},
					{weight:2, name:"BlocksRocks", noExit: direction.north},
					{weight:2, name:"HoleWest", noExit: direction.nes},
					{weight:2, name:"HoleEast", noExit: direction.nsw},
					{weight:1, name:"HealthLever"},
					{weight:2, name:"BombPuzzle"},
					{weight:3, name:"PlantPath", noExit: direction.north},
					{weight:3, name:"PressurePlate"},
					{weight:2, name:"RockedIn"},
					{weight:3, name:"Cross"},
					{weight:2, name:"SwitchCost", noExit: direction.ns},
					{weight:2, name:"SwitchCost02"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:4, name:"Chest"},
					{weight:3, name:"BridgeEast", noExit: direction.nes},
					{weight:3, name:"BridgeWest", noExit: direction.nsw},
					{weight:3, name:"BombPuzzle", noExit: direction.north},
					{weight:3, name:"TorchPuzzle"},
					{weight:3, name:"CornerItem", noExit: direction.sw},
					{weight:3, name:"Nugg"},
					{weight:2, name:"Bard", ...roomOptions.bard, noExit: direction.west},
					{weight:1, name:"HealthLever"},
					{weight:2, name:"RuinsChest"},
					{weight:1, name:"Altar"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:3, name:"RockedPotions"},
					{weight:2, name:"Tent"},
					{weight:3, name:"FlowerItem"},
					{weight:2, name:"CursedTorch"},
					{weight:4, name:"BridgeItem"},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:3, name:"Chest"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:1, name:"DoubleChestLockedIn"},
					{weight:2, name:"Potion"},
					{weight:2, name:"TinyIsland"},
					{weight:3, name:"PondItem"},
					{weight:2, name:"CursedTorch"},
					{weight:1, name:"Altar"},
					{weight:3, name:"BombStash"},
					{weight:3, name:"KeyStash"},
					{weight:2, name:"CursedRelic"},
					{weight:2, name:"LootTree"},
					{weight:1, name:"Blessing"},
					{weight:2, name:"RockedInChests"},
					{weight:2, name:"Bard", ...roomOptions.bard},
				]
			},
			altar: {
				default: roomOptions.altarAlt,
				rooms: [
					{weight:1, name:"Torches"},
					{weight:1, name:"Woods"},
					{weight:1, name:"Hole"},
					{weight:1, name:"Tiny", noExit: direction.new},
					{weight:1, name:"TiledRoom"},
					{weight:1, name:"Water"},
				]
			},
			altar_locked: {
				default: roomOptions.altarLockedAlt,
				rooms: [
					{weight:1, name:"Woods"},
					{weight:1, name:"Torches"},					
					{weight:1, name:"Hole"},					
					{weight:1, name:"Tiny", noExit: direction.new},
					{weight:1, name:"TiledRoom"},
					{weight:1, name:"Water"},
				]
			},
			altar_guackamole: {
				default: roomOptions.altarGuacamoleAlt,
				rooms: [
					{weight:1, name:"Torches"},					
					{weight:1, name:"Hole"},
					{weight:1, name:"Woods"},
					{weight:1, name:"Tiny", noExit: direction.new},
					{weight:1, name:"TiledRoom"},
					{weight:1, name:"Water"},
				]
			},
		},
		large: {
			normal: {
				default:{difficulty:[1, 10]},
				rooms: [
					{weight:3, name:"Empty"},
					{weight:3, name:"HoleStatue"},
					{weight:3, name:"RockTorch"},
					{weight:3, name:"Tiles"},
					{weight:3, name:"Water"},
					{weight:3, name:"BowTie", noExit: direction.ns},
					{weight:3, name:"Razor", noExit: direction.ew},
					{weight:3, name:"VerticalHoles"},
					{weight:3, name:"WindingHole"},
					{weight:3, name:"RockPile"},
					{weight:3, name:"CenterPillars", difficulty:[1, 8]},
					{weight:3, name:"GrassyPond"},
					{weight:3, name:"CornerNW", noExit: direction.es, difficulty:[1, 0]},
					{weight:3, name:"CornerNE", noExit: direction.sw, difficulty:[1, 0]},
					{weight:3, name:"CornerSW", noExit: direction.ne, difficulty:[1, 0]},
					{weight:3, name:"CornerSE", noExit: direction.nw, difficulty:[1, 0]},
					{weight:3, name:"CheckeredHoles"},
					{weight:3, name:"BlocksTiles"},
					{weight:3, name:"Forest"},
					{weight:3, name:"CurveNE", noExit: direction.west},
					{weight:3, name:"CurveNW", noExit: direction.east},
					{weight:3, name:"CurveSE", noExit: direction.west},
					{weight:3, name:"CurveSW", noExit: direction.east},
					{weight:3, name:"DeadlyBridge", noExit: direction.ew, difficulty:[1, -35]},
					{weight:3, name:"WiderBridge", noExit: direction.ew, difficulty:[1, -25]},
					{weight:3, name:"NorthHole", difficulty:[1, -10]},
					{weight:3, name:"Bridges", difficulty:[1, -20]},
					{weight:3, name:"ArrowTrap"},
					{weight:3, name:"ElaborateTrap", difficulty:[1, 0]},
					{weight:3, name:"NorthEastHole", noExit: direction.east, difficulty:[1, 0]},
					{weight:3, name:"SouthWestHole", noExit: direction.west, difficulty:[1, 0]},
					{weight:3, name:"Rainbow", noExit: direction.south, difficulty:[1, 0]},
					{weight:3, name:"Ruins01"},
					{weight:3, name:"Ruins02"},
					{weight:3, name:"Ruins03"},
					{weight:3, name:"Ruins04"},
					{weight:3, name:"Ruins05a", difficulty:[1, 0]},
					{weight:3, name:"Ruins05b", difficulty:[1, 0]},
					{weight:3, name:"Ruins06", difficulty:[1, 0]},
					{weight:3, name:"HiddenFun"},
					{weight:3, name:"Trees"},
					{weight:3, name:"Plaza"},
					{weight:3, name:"TreeNest"},
					{weight:3, name:"TreeGrid", difficulty:[1, 0]},
					{weight:3, name:"TreeHole", difficulty:[1, 0]},
					{weight:3, name:"RockMaze", difficulty:[1, 0]},
				]
			},	
			treasure: {
				rooms: [				
					{weight:3, name:"JustTreasure01"},
					{weight:3, name:"HoleRocks"},
					{weight:2, name:"ArrowTrapHole"},
					{weight:3, name:"DenseForest"},
					{weight:2, name:"ToughJumps"},
					{weight:2, name:"Plates"},
					{weight:2, name:"Plaza"},
					{weight:2, name:"Pond"},
					{weight:3, name:"Spikes"},
					{weight:3, name:"Overgrown", noExit: direction.west},
					{weight:1, name:"DangerHallway"},
					{weight:2, name:"FourTorches"},
					{weight:2, name:"BombPuzzle"},
					{weight:1, name:"LotsOfStuff"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:3, name:"HoleSwitch", noExit: direction.nes},
					{weight:3, name:"JustTreasure02"},
					{weight:2, name:"SpikeCourse", noExit: direction.ew},
					{weight:3, name:"Bridge", noExit: direction.nsw},
					{weight:1, name:"JustTreasureSmall", noExit: direction.new},
					{weight:2, name:"AllOrNothing"},
					{weight:2, name:"SpookyFourTorches"},
				]
			},
			secret: {
				default: roomOptions.secret,
				rooms: [
					{weight:3, name:"Chest"},
					{weight:1, name:"Altar"},
					{weight:1, name:"Camp", noExit: direction.ne},
					{weight:2, name:"PressureItems"},
					{weight:2, name:"BlackRabbitShop"},
					{weight:1, name:"Blessing"},
					{weight:2, name:"RockedItems"},
					{weight:2, name:"RockedItems02", noExit: direction.ew},
					{weight:3, name:"Bombs"},
					{weight:3, name:"Food"},
					{weight:3, name:"Keys"},
					{weight:2, name:"PoisonedItems"},
					{weight:2, name:"BlockLever"},
					{weight:3, name:"Diamond"},
				]
			},
			hidden: {
				default: roomOptions.hidden,
				rooms: [
					{weight:1, name:"Altar"},
					{weight:1, name:"Blessing"},
					{weight:1, name:"DoubleLockedChest"},
					{weight:2, name:"CookedFood"},
					{weight:2, name:"OopsAllTorches"},
					{weight:2, name:"GoldTree"},
					{weight:2, name:"Series"},
					{weight:2, name:"SpikeSacrifice"},
					{weight:3, name:"SpikeIsland"},
				]
			},
			special: {
				rooms: [
					{tag:"relic_altar", name:"RelicAltar", ...roomOptions.relicAltar},					
					{tag:"down_boss", name:"PlunderKingEntrance", ...roomOptions.bossRoom},					
					{tag:"queen_room", name:"QueensRoom", ...roomOptions.queensRoom},					
					{tag:"royal_road_4", name:"RoyalRoad_4", ...roomOptions.royalRoad},					
					{tag:"royal_road_2", name:"RoyalRoad_2", ...roomOptions.royalRoad},					
					{tag:"royal_road_3", name:"RoyalRoad_3", ...roomOptions.royalRoad},					
					{tag:"royal_road_0", name:"RoyalRoad_0", ...roomOptions.royalRoadStart},					
					{tag:"royal_road_1", name:"RoyalRoad_1", ...roomOptions.royalRoad},					
				]
			},
			challange: {
				rooms: [
					{weight:1, name:"GamblingRoom", icon: icon.shopBR},
					{weight:1, name:"Combat", icon: icon.combat},
				]
			},
		},
	},
	shop: {
		shop: {
			shop: {
				default: {icon: icon.shop},
				rooms: [					
					{tag:"pilfer_shop", name:"Encounter_Shop"},
					{tag:"pilfer_shop, shop_om", name:"Encounter_Shop_OM"},
					{tag:"pilfer_shop, market_baby", name:"Encounter_Market_Baby", subFloor:1},
					{tag:"pilfer_shop, market", name:"Encounter_Market", ...roomOptions.undergroundMarket},
					{tag:"shop_storeroom", name:"Encounter_StoreRoom", ...roomOptions.storeRoom},
				]
			},
		},
	},
	blackRabbit: {
		blackRabbit: {
			blackRabbit: {
				default: roomOptions.blackRabbitShop,
				rooms: [
					{weight:4, name:"Encounter_BR_Shop"},
					{weight:1, name:"Encounter_BR_TreasureGame"},
					{weight:1, name:"Encounter_BR_LeverGame", tag: "test"},
				]
			},
		},
	},
	sleepyHoodyRoom: {
		sleepyHoodyRoom: {
			sleepyHoodyRoom: {
				rooms: [
					{weight:1, name:"Hoody Room"},
				]
			},
		},
	},
}