const trial = {
    discoveredRatBond: false,
    whip_enabled: true,
    itemCircinus: true,
    bard_met: false,
    itemFreedom: true
}

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
    exlamaiton,
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



const encounters = {
	mine: {
		small: {
			begin: {
				rooms: [
					[4, {name: "begin"}],
				],
				shared: {
					icon: icon.start,
					sequence: {tag: "hoodie_entrance", direction: direction.north,
						requirements: (flag) => (
							flag.storyMode
						),
					},
				},
			},
			end: {
				rooms: [
					[1, {name: "Normal", tag: "end"}],
					[1, {name: "Worm", icon: icon.boss, tag: "end_worm"}],
					[1, {name: "Boss", icon: icon.boss, tag: "end_boss"}],
					[1, {name: "Tutorial", tag: "end_tutorial"}],
				],
				shared: {
					icon: icon.exit,
				},
			},
			tutorial: {
				rooms: [
					[1, {
						name: "Begin",
						icon: icon.start,
						tag: "begin_tutorial",
						sequence: {tag: "tutorial_secret", direction: direction.north},
					}],
					[1, {name: "Jump", tag: "tutorial_jump"}],
					[1, {name: "Attack", tag: "tutorial_attack"}],
					[1, {name: "Bomb", tag: "tutorial_bomb"}],
					[1, {name: "Relic", icon: icon.relicOn, tag: "tutorial_relic"}],
					[1, {name: "Secret", icon: icon.secret, tag: "tutorial_secret"}],
				],
			},
			easy: {
				rooms: [
					[1, {name: "Spinner"}],
					[1, {name: "Spikes"}],
					[3, {name: "Pillar"}],
					[1, {name: "Plain"}],
				],
			},
			normal: {
				rooms: [
					[3, {name: "MineCart"}],
					[3, {name: "Pillar"}],
					[3, {name: "PillarHole"}],
					[3, {name: "PillarSpinner"}],
					[3, {name: "RockWall"}],
					[3, {name: "SouthNorthHole"}],
					[3, {name: "StationarySpinners"}],
					[3, {name: "BrokenCarts"}],
					[3, {name: "StatueSpinner"}],
					[2, {name: "Bridge"}],
					[3, {name: "EWSpinners", noExit: direction.ns}],
					[3, {name: "CornerHoles"}],
					[3, {name: "DualPillar"}],
					[3, {name: "Spikes"}],
					[3, {name: "SpikePatch"}],
					[3, {name: "PillarSpawner"}],
					[1, {name: "SetPiece"}],
					[2, {name: "HoleEW", noExit: direction.ns}],
					[2, {name: "HoleEWSpinner", noExit: direction.ns}],
					[4, {name: "Plain"}],
					[2, {name: "HazardHeavy"}],
					[2, {name: "DangerWalls", noExit: direction.ew}],
					[3, {name: "TilePattern"}],
					[3, {name: "CornerRocks"}],
					[2, {name: "RockPath"}],
					[3, {name: "DiagonalHole"}],
					[3, {name: "CenterTorches"}],
					[2, {name: "Ruins"}],
					[3, {name: "Statues"}],
					[3, {name: "LargeSpinnerTrack"}],
				],
			},		
			special: {
				rooms: [
					{
						name: "DodsonCage",
						icon: icon.exlamaiton,
						tag: "DodsonCageEncounter",							
						requirements: (flag) => (
							!flag.peasant1_unlocked && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "WaylandShop",
						icon: icon.exlamaiton,
						tag: "waylandshop",
						noExit: direction.new,
						door: door.rock,
						requirements: (flag) => (
							(!flag.waylandBootsFound || !flag.blacksmith_rescued) && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "WaylandShopHallway",
						tag: "waylandshophallway",
						requirements: (flag) => (
							(!flag.waylandBootsFound || !flag.blacksmith_rescued) && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "MushroomFamily",
						tag: "mushroom",
						noExit: direction.north,
						door: door.rock,
						requirements: (flag) => (
							!flag.mushroom_green && flag.apprentice_met && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "MushroomFarm",
						tag: "mushroom",
						requirements: (flag) => (
							!flag.mushroom_blue && flag.apprentice_met && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "BlackRabbit",
						icon: icon.shopBR,
						tag: "black_rabbit_first",
						noExit: direction.nsw,
						requirements: (flag) => (
							!flag.black_rabbit_met && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "Hoodie_Locked",
						tag: "hoodie_entrance",
						door: door.crystal,
						requirements: (flag) => (
							flag.rockmimic_defeated && !flag.hoodie_met_mine && (flag.floor_number == 1) && flag.storyMode
						),
					},
					{
						name: "Hoodie_Unlocked",
						icon: icon.hoody,
						tag: "hoodie_entrance",
						requirements: (flag) => (
							flag.rockmimic_defeated && flag.hoodie_met_mine && (flag.floor_number == 1) && flag.storyMode
						),
					},
					{
						name: "TributeFountain",
						icon: icon.fountain,
						tag: "tribute_fountain",
						requirements: (flag) => (
							flag.storyMode && !flag.ribute_fountain_encountered && flag.bog_unlocked
						),
					},
				],
			},
			relic: {
				rooms: [
					[4, {name: "Torches"}],
					[4, {name: "Pots"}],
					[4, {name: "Hole", noExit: direction.nes}],
					[1, {name: "TorchPuzzle", noExit: direction.north}],
					[4, {name: "Statues"}],
				],
				shared: {
					icon: icon.relicOn,
					door: door.locked,
					requirements: (flag) => (
						!flag.itemFreedom
					),
				},
				unlocked: {
					shared: {
						door: door.normal,
					},
				},
			},
			secret: {
				rooms: [
					[4, {name: "WaterChest"}],
					[4, {name: "Carts"}],
					[1, {name: "Altar"}],
					[3, {name: "CursedTorch"}],
					[3, {name: "Crystals"}],
					[4, {name: "Chest"}],
					[3, {name: "SpikeSacrifice"}],
					[1, {name: "Blessing"}],
					[3, {name: "Items"}],
					[3, {name: "Chest"}],
					[3, {name: "ChestCommon"}],
					[3, {name: "KeyBlock"}],
					[3, {name: "Bombs"}],
					[10, {name: "DogShadow",
						requirements: (flag) => (
							!flag.dog_shadow_found && (flag.delve_count > 5) && !flag.whip_enabled
						),
					}],
					[2, {name: "LeverBlocks", noExit: direction.north}],
					[1, {name: "Tent"}],
					[2, {name: "Nugg"}],
					[3, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
					[3, {name: "TributeFountain", icon: icon.fountain,
						requirements: (flag) => (
							flag.storyMode && flag.bog_unlocked
						),
					}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[3, {name: "WaterChest"}],
					[3, {name: "Carts"}],
					[1, {name: "TreasureHunt", noExit: direction.north,
						requirements: (flag) => (
							!flag.secret_treasure_note && !flag.whip_enabled
						),
					}],
					[1, {name: "Altar"}],
					[2, {name: "CursedTorch"}],
					[2, {name: "CursedRelic"}],
					[3, {name: "Crystals"}],
					[1, {name: "Lab"}],
					[3, {name: "Chest"}],
					[3, {name: "SpikeSacrifice"}],
					[1, {name: "Blessing"}],
					[1, {name: "Blessing02"}],
					[1, {name: "ButchersRoom"}],
					[1, {name: "RatFriendship", tag: "mrrat",
						requirements: (flag) => (
							!flag.discoveredRatBond && !flag.whip_enabled
						),
					}],
					[3, {name: "Chest"}],
					[2, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},
			treasure: {
				rooms: [
					[3, {name: "Skeleton"}],
					[3, {name: "Rocks"}],
					[3, {name: "Spikes"}],
					[2, {name: "HoleBridges"}],
					[3, {name: "LockedRocks", noExit: direction.south}],
					[2, {name: "StatuePuzzle"}],
					[3, {name: "LockedBlocks", noExit: direction.north}],
					[1, {name: "CursedRelics", door: door.locked}],
					[3, {name: "SpikeCage"}],
					[3, {name: "RockCage"}],
					[1, {name: "SpikeSacrifice"}],
					[2, {name: "DiagonalRocks"}],
					[2, {name: "HealthLever", noExit: direction.south}],
					[2, {name: "Pillar"}],
				],
			},
			treasureBasic: {
				rooms: [
					[1, {name: "Skeleton"}],
					[1, {name: "Rocks"}],
					[1, {name: "Plain"}],
				],
			},
			altar: {
				rooms: [
					[2, {name: "Torches"}],
					[2, {name: "Statues"}],
					[2, {name: "Bridges"}],
					[2, {name: "Tiled", noExit: direction.south}],
				],
				shared: {
					icon: icon.altarOn,
					sequence: {tag: "altar_guacamole"},
					weightedDoor: [
						[1, {door: door.normal}],
						[1, {door: door.locked}],
					],
					requirements: (flag) => (
						flag.priestess_met > 2
					),
				},
				locked: {
					shared: {
						weightedDoor: null,
						door: door.locked,
					},
				},
			},			
			altarGuacamole: {
				rooms: [
					[2, {name: "Torches"}],
					[2, {name: "Statues"}],
					[2, {name: "Bridges"}],
					[2, {name: "Tiled", noExit: direction.south, 
						requirements: (flag) => (
							flag.guacamole > 2
						),
					}],
				],
				shared: {
					icon: icon.altarOn,
					requirements: (flag) => (
						flag.guacamole
					),
				},
			}					
		},
		large: {
			normal: {
				rooms: [
					[2, {name: "RailStatues"}],
					[2, {name: "LargeRail"}],
					[2, {name: "HoleBridge"}],
					[2, {name: "RailSnake"}],
					[2, {name: "Staging"}],
					[2, {name: "PillarRocks"}],
					[2, {name: "SpikeDonut"}],
					[3, {name: "RailBrideLoop"}],
					[3, {name: "RailBridge"}],
					[1, {name: "OilBarrels"}],
					[2, {name: "MineField"}],
					[2, {name: "Bridges"}],
					[2, {name: "Spikes"}],
					[3, {name: "CornerNE", noExit: direction.sw}],
					[1, {name: "LandBridgeNS", noExit: direction.ew}],
					[2, {name: "DualPillars"}],
					[2, {name: "SpikeBridge", noExit: direction.ns}],
					[3, {name: "CornerSW", noExit: direction.ne}],
					[2, {name: "RockCross"}],
					[2, {name: "SlotHoles"}],
					[2, {name: "RockColumns"}],
					[3, {name: "ATrack"}],
					[3, {name: "DynamicHole"}],
					[2, {name: "TeeRocks"}],
					[3, {name: "HoleArrows"}],
					[1, {name: "DualSetPiece"}],
					[3, {name: "Arena", noExit: direction.ew}],
					[2, {name: "ArenaTrack", noExit: direction.ew}],
					[2, {name: "QuadPillars"}],
					[2, {name: "RockArrowMaze"}],
					[2, {name: "RailGuantlet", noExit: direction.ns}],
					[2, {name: "HazardHeavy"}],
					[2, {name: "ArrowGuantlet"}],
					[2, {name: "DonutSpinner", noExit: direction.ns}],
					[2, {name: "CornerRocks"}],
					[2, {name: "TeeJunction", noExit: direction.north}],
					[3, {name: "CornerBridge"}],
					[3, {name: "BridgeHole"}],
					[3, {name: "BigRocks"}],
					[3, {name: "TriangleRocks"}],
					[2, {name: "SnakeBridge"}],
					[3, {name: "RandomBlocks"}],
					[3, {name: "Empty"}],
					[4, {name: "TwoSetPiece"}],
					[3, {name: "Grassy"}],
					[2, {name: "FivePillars"}],
					[1, {name: "SnakeTrack"}],
					[3, {name: "Torches"}],
					[2, {name: "RailIslands"}],
					[1, {name: "MushroomGrowOp"}],
				],
			},					
			special: {
				rooms: [
					{
						name: "RockMimic",						
						tag: "RockMimicEncounter",							
						requirements: (flag) => (
							!flag.prisoner_key && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "MushroomDarkness",						
						tag: "mushroom",
						door: door.rock,
						requirements: (flag) => (
							!flag.mushroom_purple && flag.apprentice_met && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "AlchemistApprentice0",
						icon: icon.exlamaiton,
						tag: "mushroom_apprentice",
						requirements: (flag) => (
							!flag.apprentice_met && flag.blacksmith_rescued && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "AlchemistApprentice3",
						icon: icon.exlamaiton,
						tag: "mushroom_apprentice",
						requirements: (flag) => (
							(flag.apprentice_met == 4) && flag.blacksmith_rescued && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "RelicAltar",
						icon: icon.relicAltar,
						tag: "relic_altar",
						upgrade: "relicAltar",
						requirements: (flag) => (
							!flag.altar_encountered && !flag.whip_enabled
						),
					},
				],
			},
			secret: {
				rooms: [
					[5, {name: "GrassChests"}],
					[1, {name: "Altar"}],
					[5, {name: "Blessing"}],
					[5, {name: "BasicItems"}],
					[5, {name: "Gold"}],
					[3, {name: "BlackRabbitShop",
						requirements: (flag) => (
							flag.black_rabbit_met > 0
						),
					}],
					[5, {name: "Potion"}],
					[5, {name: "Chest"}],
					[3, {name: "CursedTorch"}],
					[1, {name: "DangerousToGo", noExit: direction.new,
						requirements: (flag) => (
							flag.delve_count > 8
						),
					}],
					[5, {name: "SpikedFood"}],
					[3, {name: "DoubleLockBlock", noExit: direction.north}],
					[4, {name: "StatueBombPuzzle"}],
					[1, {name: "Pillars"}],
					[1, {name: "OilyBridge", noExit: direction.nes}],
					[1, {name: "DarkMaze"}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[2, {name: "Mine_Large_Hidden_LeverBlocks"}],
					[2, {name: "Mine_Large_Hidden_GrassChests"}],
					[2, {name: "Mine_Large_Hidden_TorchPuzzle"}],
					[2, {name: "Mine_Large_Hidden_Keys"}],
					[2, {name: "Mine_Large_Hidden_Potions"}],
					[1, {name: "Mine_Large_Hidden_Blessing"}],
					[1, {name: "Mine_Large_Hidden_Blessing02"}],
					[1, {name: "Mine_Large_Hidden_CursedRelics"}],
					[1, {name: "Mine_Large_Hidden_Altar", noExit: direction.north}],
					[2, {name: "Mine_Large_Hidden_PressureTrap", noExit: direction.ne}],
					[2, {name: "Mine_Large_Hidden_ChooseBlessing"}],
					[2, {name: "Mine_Large_Hidden_BobosLair"}],
					[2, {name: "Mine_Large_Hidden_CaveIn"}],
					[1, {name: "Mine_Large_Hidden_Gap"}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},
			tutorial: {
				rooms: [
					[1, {name: "Throw", tag: "tutorial_throw", doorOverride: direction.east}],
					[1, {name: "Pilfer", tag: "tutorial_pilfer"}],
				],
			},
			treasure: {
				rooms: [
					[3, {name: "ItemBlocks"}],
					[3, {name: "SpikedChest", noExit: direction.south}],
					[3, {name: "HoleSpikeChest", noExit: direction.west}],
					[3, {name: "TorchPuzzle"}],
					[3, {name: "SpikeRails", noExit: direction.new}],
					[3, {name: "BridgePuzzle", noExit: direction.ns}],
					[3, {name: "BombPuzzle"}],
					[4, {name: "JustSomeTreasure", noExit: direction.north}],
					[2, {name: "LeverBridge", noExit: direction.west}],
					[3, {name: "VerticalBridge"}],
					[4, {name: "Decision", noExit: direction.south}],
					[3, {name: "HealthLever"}],
					[5, {name: "SecretShop", icon: icon.shop, door: door.crystal,
						requirements: (flag) => (
							flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode
						),
					}],
					[2, {name: "OilChest"}],
					[2, {name: "FireyChest"}],
					[2, {name: "ElectrifiedChest"}],
					[4, {name: "JustSomeTreasure02"}],
					[2, {name: "Nexus"}],
					[1, {name: "TwoBombsOneKey"}],
					[2, {name: "SpikeSacrifice"}],
					[2, {name: "Choice"}],
					[2, {name: "DoubleRail"}],
					[1, {name: "RockLock"}],
				],
			},
			challange: {
				rooms: [
					[1, {name: "GamblingRoom", icon: icon.shopBR}],
					[1, {name: "Combat", icon: icon.combat}],
				],
			},
		},
	},
	dungeon: {
		small: {
			begin: {
				rooms: [
					[3, {name: "Begin_Holes"}],
					[3, {name: "Begin_Plain"}],
					[3, {name: "Begin_Statues"}],
					[1, {name: "Begin_Squeeze"}],
					[2, {name: "Begin_Cells"}],
				],
				shared: {
					icon: icon.start,
					sequence: {tag: "hoodie_entrance", direction: direction.north,
						requirements: (flag) => (
							flag.storyMode
						),
					},
				},
			},
			end: {
				rooms: [
					[1, {name: "End", tag:"end"}],
					[1, {name: "Boss", icon: icon.boss, tag: "end_boss"}],
				],
				shared: {
					icon: icon.exit,
				},
			},
			normal: {
				rooms: [
					[3, {name: "Spikes"}],
					[3, {name: "LongHole"}],
					[3, {name: "Pillars", noExit: direction.ew}],
					[3, {name: "Water"}],
					[3, {name: "Torches"}],
					[3, {name: "DynamicPillar"}],
					[1, {name: "ArrowBridge", noExit: direction.ns}],
					[1, {name: "FlamingArrows", noExit: direction.ew}],
					[3, {name: "TallBlocks"}],
					[1, {name: "SetPiece"}],
					[2, {name: "Track"}],
					[3, {name: "Empty"}],
					[3, {name: "SmallBowTie", noExit: direction.ns}],
					[3, {name: "RazorBlade", noExit: direction.ew}],
					[2, {name: "VerticalHole", noExit: direction.ns}],
				],
			},		
			special: {
				rooms: [
					{
						name: "Entrance",
						icon: icon.exit,
						tag: "dungeon_entrance",
						door: door.iron,						
						requirements: (flag) => (
							flag.storyMode
						),
					},
					{
						name: "DibblesStoreRoom",
						icon: icon.exlamaiton,
						tag: "store_room",
						door: door.secret,
						requirements: (flag) => (
							!flag.peasant2_unlocked && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "Library",
						tag: "dungeonlibrary",
						door: door.locked,
						requirements: (flag) => (
							!flag.collector_book && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "PriestessEntrance",
						tag: "priestess",
						sequence: {tag: "priestesshall1"},
						requirements: (flag) => (
							!flag.priestess_met && !flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "Hoodie_Locked",
						tag: "hoodie_entrance",
						door: door.crystal,
						requirements: (flag) => (
							!flag.hoodie_met_dungeon && (flag.floor_number == 5) && flag.storyMode
						),
					},
					{
						name: "Hoodie_Unlocked",
						icon: icon.hoody,
						tag: "hoodie_entrance",
						requirements: (flag) => (
							flag.hoodie_met_dungeon && (flag.floor_number == 5) && flag.storyMode
						),
					},
					{
						name: "TributeFountain",
						icon: icon.fountain,
						tag: "tribute_fountain",
						requirements: (flag) => (
							flag.storyMode && !flag.tribute_fountain_encountered && flag.bog_unlocked
						),
					},
				],
			},
			relic: {
				rooms: [
					[3, {name: "Statues"}],
					[3, {name: "Water"}],
					[2, {name: "Pillars", noExit: direction.ew}],
					[3, {name: "WindingBridge", noExit: direction.north}],
					[3, {name: "Holes"}],
				],
				shared: {
					icon: icon.relicOn,
					door: door.locked,
					requirements: (flag) => (
						!flag.itemFreedom
					),
				},
				unlocked: {
					shared: {
						door: door.normal,
					},
				},
			},
			treasure: {
				rooms: [
					[3, {name: "StatueChest"}],
					[3, {name: "CellNE", noExit: direction.ne}],
					[3, {name: "CellsEW", noExit: direction.ew}],
					[3, {name: "DiamondFloor"}],
					[3, {name: "CellN", noExit: direction.north}],
					[3, {name: "CellE", noExit: direction.nes}],
					[3, {name: "CellW", noExit: direction.nsw}],
					[3, {name: "BrickStatue"}],
					[3, {name: "SpikedChest"}],
					[1, {name: "SpikedHallwayW", noExit: direction.nsw}],
					[1, {name: "SpikedHallwayE", noExit: direction.new}],
					[3, {name: "Track"}],
					[1, {name: "TinyRoom", noExit: direction.new}],
					[2, {name: "HealthLever"}],
					[3, {name: "JustAChest"}],
				],
			},
			secret: {
				rooms: [
					[5, {name: "OpenedChest"}],
					[5, {name: "WaterChest"}],
					[3, {name: "SpikeSacrifice"}],
					[3, {name: "CursedTorch"}],
					[3, {name: "BombStorage"}],
					[1, {name: "Altar"}],
					[3, {name: "StorageRoom"}],
					[3, {name: "DualLevers"}],
					[5, {name: "Potion"}],
					[1, {name: "Blessing"}],
					[10, {name: "DogEngine",
						requirements: (flag) => (
							flag.dog_engine_found && (flag.delve_count > 6) && !flag.whip_enabled
						),
					}],
					[3, {name: "Talisman",
						requirements: (flag) => (
							flag.priestess_met > 2
						),
					}],
					[2, {name: "KeyPillar"}],
					[1, {name: "BigChest"}],
					[2, {name: "Nugg"}],
					[3, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
					[3, {name: "TributeFountain", icon: icon.fountain,
						requirements: (flag) => (
							flag.storyMode && flag.bog_unlocked
						),
					}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[10, {name: "Kurtz", tag: "kurtz", noExit: direction.ns}],
					[3, {name: "DoubleChest"}],
					[3, {name: "GoldStatue"}],
					[3, {name: "WaterChest"}],
					[3, {name: "SpikeSacrifice"}],
					[3, {name: "CursedTorch"}],
					[3, {name: "BombStorage"}],
					[1, {name: "TripleCursedChest"}],
					[1, {name: "DoubleBlessing"}],
					[1, {name: "Lab"}],
					[2, {name: "CursedRelic"}],
					[1, {name: "PyroLair"}],
					[3, {name: "StatueChest"}],
					[3, {name: "CostedLever"}],
					[1, {name: "CursedRelic"}],
					[1, {name: "FourBigChests"}],
					[2, {name: "Bard"}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},			
			altar: {
				rooms: [
					[1, {name: "Pillars"}],
					[1, {name: "CellE"}],
					[1, {name: "Statues"}],
				],
				shared: {
					icon: icon.altarOn,
					sequence: {tag: "altar_guacamole"},
					weightedDoor: [
						[1, {door: door.normal}],
						[1, {door: door.locked}],
					],
					requirements: (flag) => (
						flag.priestess_met > 2
					),
				},
				locked: {
					shared: {
						weightedDoor: null,
						door: door.locked,
					},
				},
				guacamole: {
					shared: {
						weightedDoor: null,
						sequence: null,
						requirements: (flag) => (
							flag.guacamole
						),
					},
				},
						
			}	
		},
		large: {
			normal: {
				rooms: [
					[3, {name: "CenterTurret"}],
					[3, {name: "Flooded"}],
					[3, {name: "DualPillar"}],
					[3, {name: "SlotHoles"}],
					[3, {name: "CornerWater"}],
					[3, {name: "BridgeEW", noExit: direction.ns}],
					[3, {name: "BridgeNS", noExit: direction.ew}],
					[2, {name: "BendNE", noExit: direction.sw}],
					[1, {name: "BendNEPillar", noExit: direction.sw}],
					[2, {name: "BendSW", noExit: direction.ne}],
					[1, {name: "BendSWPillar", noExit: direction.ne}],
					[3, {name: "BallChainDynamic"}],
					[3, {name: "BallChain"}],
					[3, {name: "HolesBlocks"}],
					[3, {name: "DynamicShape"}],
					[3, {name: "Cells"}],
					[1, {name: "Guantlet", noExit: direction.ns}],
					[1, {name: "Furnace"}],
					[1, {name: "Turrets"}],
					[3, {name: "DynamicHole"}],
					[3, {name: "Gutters"}],
					[3, {name: "Blocks"}],
					[3, {name: "Sewer"}],
					[3, {name: "CornerTurrets"}],
					[2, {name: "SpikeStrip", noExit: direction.ns}],
					[3, {name: "Cross"}],
					[3, {name: "Ess", noExit: direction.ns}],
					[3, {name: "DonutSpinner"}],
					[3, {name: "Plain"}],
					[3, {name: "HazardHeavy"}],
					[3, {name: "Pools"}],
					[3, {name: "ElBlocks"}],
					[3, {name: "BowTie", noExit: direction.ns}],
					[3, {name: "RazorBlade", noExit: direction.ew}],
					[2, {name: "WestDiagonal", noExit: direction.west}],
					[2, {name: "EastDiagonal", noExit: direction.east}],
					[1, {name: "FireWitchHunt"}],
					[1, {name: "FurnacePart2"}],
					[2, {name: "SlidingWall"}],
					[2, {name: "SlantedPillars"}],
					[2, {name: "CornerSlants"}],
					[1, {name: "SewerPart2", noExit: direction.ns}],
					[3, {name: "SewerPart3"}],
					[2, {name: "SewerPart4"}],
					[1, {name: "VerticalHall", noExit: direction.ew}],
					[3, {name: "CornerPillar"}],
					[3, {name: "OffsetTurrets"}],
					[2, {name: "MorningStarBridge", noExit: direction.north}],
				],
			},	
			treasure: {
				rooms: [
					[4, {name: "CornerTurrets"}],
					[4, {name: "RockTurret"}],
					[4, {name: "StatuePuzzle"}],
					[4, {name: "CrystalHole", noExit: direction.ew}],
					[4, {name: "TorchPuzzle", noExit: direction.ew}],
					[4, {name: "DoubleCell", noExit: direction.new}],
					[4, {name: "CellBlock"}],
					[4, {name: "SpikeSacrifice"}],
					[3, {name: "SetPiece"}],
					[2, {name: "DoubleSetPiece", noExit: direction.north}],
					[4, {name: "JustSomeTreasure"}],
					[3, {name: "HealthLever"}],
					[3, {name: "Guantlet"}],
					[5, {name: "SecretShop", icon: icon.shop, door: door.crystal,
						requirements: (flag) => (
							flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode
						),
					}],
					[3, {name: "TurretDodging"}],
					[3, {name: "BarrelTimer", noExit: direction.sw}],
					[1, {name: "BladeBridge"}],
					[2, {name: "Choice"}],
					[1, {name: "SpikeWave", noExit: direction.west}],
					[1, {name: "StoreHouse"}],
				],
			},
			secret: {
				rooms: [
					[1, {name: "Altar"}],
					[3, {name: "BlackRabbitShop",
						requirements: (flag) => (
							flag.black_rabbit_met
						),
					}],
					[5, {name: "Chest"}],
					[5, {name: "TorchPuzzle"}],
					[5, {name: "Cells"}],
					[5, {name: "Chest02"}],
					[5, {name: "Gold"}],
					[4, {name: "Bombs"}],
					[4, {name: "Keys"}],
					[1, {name: "Blessing"}],
					[4, {name: "ChestItem"}],
					[3, {name: "Talisman", 
						requirements: (flag) => (
							flag.priestess_met > 2
						),
					}],
					[1, {name: "Garden", noExit: direction.esw}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[1, {name: "AltarCell"}],
					[2, {name: "WaterChest"}],
					[1, {name: "Altar"}],
					[2, {name: "ItemRocks"}],
					[2, {name: "TorchPuzzle"}],
					[2, {name: "Keys"}],
					[2, {name: "Potions"}],
					[2, {name: "DoubleWall"}],
					[1, {name: "BlessingChoice"}],
					[2, {name: "CellChests"}],
					[2, {name: "DoubleLeverTrap"}],
					[2, {name: "TorchTurretPuzzle"}],
					[2, {name: "Gap"}],
					[2, {name: "JumpTorchPuzzle"}],
					[1, {name: "PressurePlate"}],
					[1, {name: "Islands"}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},
			special: {
				rooms: [
					{
						name: "DibblesEmporium",
						icon: icon.exlamaiton,						
						tag: "dibble",
						noExit: direction.ew,
						sequence: {tag: "store_room", direction: direction.north},						
						requirements: (flag) => (
							!flag.peasant2_unlocked&& !flag.whip_enabled && flag.storyMode
						)											
					},
					{
						name: "PriestessHall1",						
						tag: "priestesshall1",
						noExit: direction.ew,
						requirements: (flag) => (
							!flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "PriestessHall2",						
						tag: "priestesshall2",
						noExit: direction.ew,
						requirements: (flag) => (
							!flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "PriestessHall3",						
						tag: "priestesshall3",
						noExit: direction.ew,
						requirements: (flag) => (
							!flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "Priestess",
						icon: icon.exlamaiton,						
						tag: "priestess_main",
						noExit: direction.new,						
						requirements: (flag) => (
							!flag.peasant2_unlocked&& !flag.whip_enabled && flag.storyMode
						)											
					},
					{
						name: "MastersKey",
						icon: icon.boss,						
						tag: "masters_key",
						noExit: direction.new,						
						requirements: (flag) => (
							flag.priestess_met && !flag.masters_key && !flag.whip_enabled && flag.storyMode
						)											
					},
					{
						name: "StonelordEntrance",
						icon: icon.boss,
						tag: "end_stone",
						requirements: (flag) => (
							flag.storyMode
						),
					},
					{
						name: "RelicAltar",
						icon: icon.relicAltar,
						tag: "relic_altar",
						upgrade: "relicAltar",
						requirements: (flag) => (
							!flag.altar_encountered && !flag.whip_enabled
						),
					},
				],
			},		
			relic: {
				rooms: [
					[1, {name: "Dungeon_Large_Relic_Torches"}],
					[1, {name: "Dungeon_Large_Relic_Circle"}],
					[1, {name: "Dungeon_Large_Relic_Cell"}],
				],
				shared: {
					icon: icon.relicOn,
					door: door.locked,
					requirements: (flag) => (
						!flag.itemFreedom
					),
				},
				unlocked: {
					shared: {
						door: door.normal,
					},
				},
			},
			challange: {
				rooms: [
					[1, {name: "GamblingRoom", icon: icon.shopBR}],
					[1, {name: "Combat", icon: icon.combat}],
				],
			},
		},
	},
	hall: {
		small: {
			begin: {
				rooms: [
					[1, {name: "Holes"}],
					[1, {name: "Statues"}],
					[1, {name: "Water"}],
					[1, {name: "Pillars"}],
					[1, {name: "Pillars02"}],
					[1, {name: "Torches"}],
				],
				shared: {
					icon: icon.start,
					sequence: {tag: "hoodie_entrance", direction: direction.north,
						requirements: (flag) => (
							flag.storyMode
						),
					},
				},
			},
			end: {
				rooms: [
					[1, {name: "End", tag:"end"}],
					[1, {name: "Boss", icon: icon.boss, tag: "end_boss"}],
				],
				shared: {
					icon: icon.exit,
				},
			},
			normal: {
				rooms: [
					[5, {name: "OddWalls"}],
					[5, {name: "Torches"}],
					[5, {name: "CornerRocks"}],
					[5, {name: "TallRocks"}],
					[5, {name: "Empty"}],
					[5, {name: "Corners"}],
					[5, {name: "CenterHole"}],
					[4, {name: "DiagonalRocks"}],
					[3, {name: "BridgeEW", noExit: direction.ns}],
					[3, {name: "BridgeNS", noExit: direction.ew}],
					[3, {name: "TallRocksEast", noExit: direction.east}],
					[3, {name: "TallRocksWest", noExit: direction.west}],
					[4, {name: "BowTie", noExit: direction.ns}],
					[4, {name: "HourGlass", noExit: direction.ew}],
					[5, {name: "CornerBlocks"}],
					[2, {name: "Track"}],
					[4, {name: "CornerHoles"}],
					[3, {name: "Crypt"}],
				],
			},		
			special: {
				rooms: [
					{
						name: "Entrance",
						icon: icon.exit,
						tag: "hall_entrance",
						noExit: direction.new,
						door: door.iron,						
						requirements: (flag) => (
							flag.storyMode
						),
					},
					{
						name: "ThreeChests",
						tag: "hall_hidden_three_chests",
						noExit: direction.new,
						requirements: (flag) => (
							flag.storyMode
						),
					},
					{
						name: "Hoodie_Locked",
						tag: "hoodie_entrance",
						door: door.crystal,
						requirements: (flag) => (
							!flag.hoodie_met_dungeon && (flag.floor_number == 11) && flag.storyMode
						),
					},
					{
						name: "Hoodie_Unlocked",
						icon: icon.hoody,
						tag: "hoodie_entrance",
						requirements: (flag) => (
							flag.hoodie_met_dungeon && (flag.floor_number == 11) && flag.storyMode
						),
					},
					{
						name: "Hall_Small_Special_Library",
						icon: icon.exlamation,
						tag: "hall_library",
						requirements: (flag) => (
							!flag.whip_enabled && flag.storyMode
						),
					},
					{
						name: "TributeFountain",
						icon: icon.fountain,
						tag: "tribute_fountain",
						requirements: (flag) => (
							flag.storyMode && !flag.tribute_fountain_encountered && flag.bog_unlocked
						),
					},
				],
			},
			relic: {
				rooms: [
					[1, {name: "Lanterns"}],
					[1, {name: "Statues"}],
					[1, {name: "Pillars"}],
				],
				shared: {
					icon: icon.relicOn,
					door: door.locked,
					requirements: (flag) => (
						!flag.itemFreedom
					),
				},
				unlocked: {
					shared: {
						door: door.normal,
					},
				},
			},
			treasure: {
				rooms: [
					[2, {name: "SetPiece"}],
					[3, {name: "ChestSpawner"}],
					[3, {name: "HalfEast", noExit: direction.west}],
					[3, {name: "HalfWest", noExit: direction.east}],
					[3, {name: "SpikeChest"}],
					[3, {name: "SpinnerChest"}],
					[2, {name: "HealthLever"}],
					[1, {name: "CursedRelics"}],
					[2, {name: "SpikeSacrifice"}],
					[2, {name: "OilSpikes"}],
					[3, {name: "JustAChest"}],
				],
			},
			secret: {
				rooms: [
					[5, {name: "Chest02"}],
					[5, {name: "Skeletons"}],
					[3, {name: "SpikeSacrifice"}],
					[1, {name: "Altar"}],
					[5, {name: "Items"}],
					[3, {name: "Keys"}],
					[5, {name: "Chest"}],
					[3, {name: "Bombs"}],
					[1, {name: "Blessing"}],
					[5, {name: "HealthLever"}],
					[3, {name: "Gold"}],
					[2, {name: "DualLevers"}],
					[3, {name: "TorchLighting"}],
					[10, {name: "DogDillon", 
						requirements: (flag) => (
							!flag.dog_dillon_found && (flag.delve_count > 7) && !flag.whip_enabled
						),
					}],
					[3, {name: "Talisman",
						requirements: (flag) => (
							flag.priestess_met > 2
						),
					}],
					[2, {name: "KeyPillar"}],
					[1, {name: "BigChest"}],
					[2, {name: "Nugg"}],
					[3, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
					[3, {name: "TributeFountain", icon: icon.fountain,
						requirements: (flag) => (
							flag.storyMode && flag.bog_unlocked
						),
					}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[3, {name: "Chest"}],
					[3, {name: "Skeletons", noExit: direction.north}],
					[2, {name: "CursedTorch", noExit: direction.north}],
					[3, {name: "SpikeSacrifice"}],
					[1, {name: "Altar"}],
					[1, {name: "CursedPedestal", noExit: direction.ns}],
					[3, {name: "ChestBridge", noExit: direction.es}],
					[1, {name: "Lab"}],
					[2, {name: "PitSpikes",
						sequence: {tag: "hall_hidden_three_chests", direction: direction.east},
					}],
					[2, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
					[1, {name: "OilBarricade"}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},			
			altar: {
				rooms: [
					[1, {name: "Torches"}],
					[1, {name: "Holes"}],
					[1, {name: "Gargoyles"}],
				],
				shared: {
					icon: icon.altarOn,
					sequence: {tag: "altar_guacamole"},
					weightedDoor: [
						[1, {door: door.normal}],
						[1, {door: door.locked}],
					],
					requirements: (flag) => (
						flag.priestess_met > 2
					),
				},
				locked: {
					shared: {
						weightedDoor: null,
						door: door.locked,
					},
				},
				guacamole: {
					shared: {
						weightedDoor: null,
						sequence: null,
						requirements: (flag) => (
							flag.guacamole
						),
					},
				},
						
			}	
		},
		large: {
			normal: {
				rooms: [
					[5, {name: "RandomPillars"}],
					[5, {name: "DonutHoles"}],
					[4, {name: "Crossroads"}],
					[5, {name: "TallRocks"}],
					[5, {name: "ZigZag"}],
					[3, {name: "SetPieces"}],
					[3, {name: "ArrowTraps"}],
					[5, {name: "Empty"}],
					[3, {name: "ArrowMaze"}],
					[2, {name: "BendSW", direction: direction.ne}],
					[1, {name: "BendSWPillar", direction: direction.ne}],
					[2, {name: "BendSE", direction: direction.nw}],
					[1, {name: "BendSEPillar", direction: direction.nw}],
					[2, {name: "BendNW", direction: direction.es}],
					[1, {name: "BendNWPillar", direction: direction.es}],
					[1, {name: "BendNEPillar", direction: direction.sw}],
					[2, {name: "BendNE", direction: direction.sw}],
					[5, {name: "Arena"}],
					[3, {name: "DeadlyDonut", direction: direction.ew}],
					[2, {name: "Knot"}],
					[2, {name: "DonutSpinner", direction: direction.ns}],
					[3, {name: "HazardHeavy"}],
					[2, {name: "GargoyleHall"}],
					[2, {name: "EWBridgeThin", direction: direction.ns}],
					[3, {name: "EWBridgeThick", direction: direction.ns}],
					[3, {name: "SpiderDen"}],
					[4, {name: "ChessBoard"}],
					[5, {name: "CrossHole"}],
					[2, {name: "ArrowFun", direction: direction.ns}],
					[5, {name: "CornerPillars"}],
					[5, {name: "CornerHoles"}],
					[4, {name: "VerticalHoles"}],
					[3, {name: "Pillars"}],
					[4, {name: "SlidingWall"}],
					[5, {name: "CornerPillars"}],
					[1, {name: "RandomWall"}],
					[1, {name: "Gargoyles"}],
				],
			},	
			treasure: {
				rooms: [
					[3, {name: "CursedRelics", door: door.locked}],
					[3, {name: "BridgeTorches", noExit: direction.ns,
						sequence: {tag: "secret", direction: direction.east}}],
					[4, {name: "JustSomeTreasure", noExit: direction.north}],
					[4, {name: "GargoylesMaybe"}],
					[4, {name: "HealthLever"}],
					[3, {name: "Eggs", noExit: direction.north}],
					[3, {name: "SecretShop", icon: icon.shop, door: door.crystal,
						requirements: (flag) => (
							flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode
						),
					}],
					[2, {name: "SpikedRoom", noExit: direction.north}],
					[3, {name: "Cage"}],
					[2, {name: "Levers", noExit: direction.nes}],
					[1, {name: "Choice"}],
					[1, {name: "Skull"}],
					[2, {name: "CursedJars", noExit: direction.south}],
					[1, {name: "PilferLever"}],
				],
			},
			secret: {
				rooms: [
					[6, {name: "Chest02"}],
					[6, {name: "Chest"}],
					[4, {name: "KeyBombMaze"}],
					[5, {name: "Items"}],
					[5, {name: "Keys"}],
					[5, {name: "Bombs"}],
					[5, {name: "Food"}],
					[4, {name: "HealthLever"}],
					[3, {name: "PuzzleLock"}],
					[2, {name: "BlessingPool"}],
					[4, {name: "Gold"}],
					[5, {name: "Altar"}],
					[1, {name: "SpaceInvader",
						requirements: (flag) => (
							flag.foundPartyPopcornPotion && !flag.whip_enabled
						),
					}],
					[3, {name: "SpikeSacrifice"}],
					[3, {name: "BombPuzzle"}],
					[4, {name: "Talisman",
						requirements: (flag) => (
							flag.priestess_met < 2
						),
					}],
					[2, {name: "KeyPillars"}],
					[2, {name: "BlackRabbitShop"}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[3, {name: "SpikeJump"}],
					[2, {name: "TorchPuzzle"}],
					[2, {name: "Keys"}],
					[3, {name: "Potions"}],
					[2, {name: "Crypt"}],
					[1, {name: "CursedRelics"}],
					[1, {name: "BlessingChoice"}],
					[3, {name: "ChessBoard"}],
					[3, {name: "SpikeSacrifice"}],
					[2, {name: "SpiderGuantlet"}],
					[1, {name: "GargoyleGuards"}],
					[1, {name: "SmallRoom"}],
					[2, {name: "Gap"}],
					[1, {name: "DiagonalSpikes"}],
					[1, {name: "Insulated"}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},
			special: {
				rooms: [
					{
						name: "ShadowlordEntrance",
						icon: icon.boss,
						tag: "end_shadow",
						requirements: (flag) => (
							flag.storyMode
						),
					},
					{
						name: "CombatWave",					
						tag: "hall_library_combat_arena",
						noExit: direction.ew,
						sequence: {tag: "hall_library", direction: direction.north},					
						requirements: (flag) => (
							!flag.collector_book && !flag.whip_enabled && flag.storyMode
						)											
					},
					{
						name: "RelicAltar",
						icon: icon.relicAltar,
						tag: "relic_altar",
						upgrade: "relicAltar",
						requirements: (flag) => (
							!flag.altar_encountered && !flag.whip_enabled
						),
					},
				],
			},
			challange: {
				rooms: [
					[1, {name: "GamblingRoom", icon: icon.shopBR}],
					[1, {name: "Combat", icon: icon.combat}],
				],
			},
		},
	},
	cavern: {
		small: {
			begin: {
				rooms: [
					[1, {name: "Plain"}],
					[1, {name: "PillarHole"}],
					[1, {name: "Pillars"}],
					[1, {name: "Round"}],
				],
				shared: {
					icon: icon.start,
					sequence: {tag: "hoodie_entrance", direction: direction.north,
						requirements: (flag) => (
							flag.storyMode
						),
					},
				},
			},
			end: {
				rooms: [
					[1, {name: "End", tag:"end"}],
					[1, {name: "Boss", icon: icon.boss, tag: "end_boss"}],
				],
				shared: {
					icon: icon.exit,
				},
			},
			normal: {
				rooms: [
					[3, {name: "Empty"}],
					[3, {name: "Corners"}],
					[3, {name: "Donut"}],
					[3, {name: "BowTie", noExit: direction.ns}],
					[3, {name: "Razor", noExit: direction.ew}],
					[3, {name: "Organic"}],
					[1, {name: "HallwayEW", noExit: direction.ns}],
					[1, {name: "HallwayNS", noExit: direction.ew}],
					[2, {name: "NoWest", noExit: direction.west}],
					[2, {name: "NoEast", noExit: direction.east}],
					[2, {name: "NoNorth", noExit: direction.north}],
					[2, {name: "NoSouth", noExit: direction.south}],
					[3, {name: "HoleCorners"}],
					[3, {name: "CenterHole"}],
					[2, {name: "VerticalHole"}],
					[2, {name: "ZPillars"}],
					[2, {name: "SPillars"}],
					[2, {name: "UPillar", noExit: direction.north}],
					[2, {name: "VPillar", noExit: direction.north}],
					[2, {name: "UPillarReverse", noExit: direction.south}],
					[2, {name: "VPillarReverse", noExit: direction.south}],
					[2, {name: "WestSlant", noExit: direction.west}],
					[2, {name: "EastSlant", noExit: direction.east}],
					[3, {name: "SpikePatch"}],
				],
			},		
			special: {
				rooms: [
					{
						name: "Entrance",
						icon: icon.exit,
						tag: "cavern_entrance",
						noExit: direction.new,
						door: door.iron,					
						requirements: (flag) => (
							flag.storyMode
						),
					},
					{
						name: "Hoodie_Locked",
						tag: "hoodie_entrance",
						door: door.crystal,
						requirements: (flag) => (
							!flag.hoodie_met_cavern && (flag.floor_number == 16) && flag.storyMode
						),
					},
					{
						name: "Hoodie_Unlocked",
						icon: icon.hoody,
						tag: "hoodie_entrance",
						requirements: (flag) => (
							flag.hoodie_met_cavern && (flag.floor_number == 16) && flag.storyMode
						),
					},
					{
						name: "HiddenCampsite",
						tag: "hidden_campsite",
						door: door.rock,
					},
					{
						name: "HiddenHallway",
						tag: "hidden_hallway",
						noExit: direction.ew,
					},
					{
						name: "TributeFountain",
						icon: icon.fountain,
						tag: "tribute_fountain",
						requirements: (flag) => (
							flag.storyMode && !flag.tribute_fountain_encountered && flag.bog_unlocked
						),
					},
				],
			},
			relic: {
				rooms: [
					[2, {name: "ocked_Blocks"}],
					[2, {name: "ocked_Round"}],
					[2, {name: "Cavern_Small_Relic_Torches"}],
					[1, {name: "Cavern_Small_Relic_Bridge"}],
				],
				shared: {
					icon: icon.relicOn,
					door: door.locked,
					requirements: (flag) => (
						!flag.itemFreedom
					),
				},
				unlocked: {
					shared: {
						door: door.normal,
					},
				},
			},
			treasure: {
				rooms: [
					[2, {name: "JustTreasure"}],
					[2, {name: "Spikes"}],
					[2, {name: "DoubleRocked"}],
					[2, {name: "ThiccRocks", noExit: direction.north}],
					[2, {name: "JustTreasureHole"}],
					[2, {name: "SpikeSacrifice"}],
					[2, {name: "HealthLever"}],
					[2, {name: "Diagonal"}],
					[2, {name: "TorchPuzzle"}],
					[2, {name: "BombPuzzle"}],
					[2, {name: "AChillSkeleton"}],
					[2, {name: "ManySkeletons"}],
					[1, {name: "CursedRelics"}],
				],
			},
			secret: {
				rooms: [
					[3, {name: "Chest"}],
					[3, {name: "SmallRoomChest", noExit: direction.new}],
					[3, {name: "SpikeSacrifice"}],
					[1, {name: "Altar"}],
					[2, {name: "CursedTorch", noExit: direction.east}],
					[3, {name: "SpikedFood"}],
					[3, {name: "PlainChest"}],
					[3, {name: "Bombs"}],
					[2, {name: "KeyPillar"}],
					[3, {name: "Keys"}],
					[1, {name: "SWBlessing", noExit: direction.ne}],
					[1, {name: "NEBlessing", noExit: direction.sw}],
					[1, {name: "NothingHole"}],
					[2, {name: "SneakyEast", noExit: direction.nsw}],
					[2, {name: "BlackRabbitShop"}],
					[3, {name: "GoldNug"}],
					[3, {name: "Potion"}],
					[2, {name: "Nugg"}],
					[3, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
					[3, {name: "TributeFountain", icon: icon.fountain,
						requirements: (flag) => (
							flag.storyMode && flag.bog_unlocked
						),
					}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[3, {name: "Chest02"}],
					[3, {name: "Chest"}],
					[2, {name: "SpikeSacrifice"}],
					[3, {name: "ResourceChests"}],
					[1, {name: "CursedTorches"}],
					[3, {name: "OvergrownChest"}],
					[1, {name: "Altar"}],
					[1, {name: "Lab"}],
					[1, {name: "Blessing"}],
					[3, {name: "Food"}],
					[2, {name: "CostedLever"}],
					[3, {name: "Bombs"}],
					[3, {name: "Keyring"}],
					[1, {name: "CampsiteHall",
						sequence: {tag: "hidden_hallway", direction: direction.north}
					}],
					[2, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},			
			altar: {
				rooms: [
					[1, {name: "Torches"}],
					[1, {name: "Holes"}],
					[1, {name: "Overgrown"}],
				],
				shared: {
					icon: icon.altarOn,
					sequence: {tag: "altar_guacamole"},
					weightedDoor: [
						[1, {door: door.normal}],
						[1, {door: door.locked}],
					],
					requirements: (flag) => (
						flag.priestess_met > 2
					),
				},
				locked: {
					shared: {
						weightedDoor: null,
						door: door.locked,
					},
				},
				guacamole: {
					shared: {
						weightedDoor: null,
						sequence: null,
						requirements: (flag) => (
							flag.guacamole
						),
					},
				},
						
			}	
		},
		large: {
			normal: {
				rooms: [
					[4, {name: "Empty"}],
					[4, {name: "Corners01"}],
					[4, {name: "Corners02"}],
					[4, {name: "CenterPillar"}],
					[5, {name: "Corners03"}],
					[3, {name: "HallwayEW", noExit: direction.ns}],
					[3, {name: "HallwayNS", noExit: direction.ew}],
					[4, {name: "CornerColumns"}],
					[4, {name: "UPillar", noExit: direction.north}],
					[4, {name: "VPillar", noExit: direction.north}],
					[4, {name: "UPillarReverse", noExit: direction.south}],
					[4, {name: "VPillarReverse", noExit: direction.south}],
					[3, {name: "ZPillar"}],
					[3, {name: "SPillar"}],
					[3, {name: "TriangleZPillar"}],
					[4, {name: "CenterHole"}],
					[4, {name: "VerticalHoles"}],
					[4, {name: "DiamondHole"}],
					[4, {name: "FigureEight"}],
					[3, {name: "WestSlant", noExit: direction.west}],
					[3, {name: "EastSlant", noExit: direction.east}],
					[4, {name: "Razor", noExit: direction.ew}],
					[4, {name: "BowTie", noExit: direction.ns}],
					[2, {name: "BendNW", noExit: direction.es}],
					[2, {name: "BendNE", noExit: direction.ew}],
					[2, {name: "BendSW", noExit: direction.ne}],
					[2, {name: "BendSE", noExit: direction.nw}],
					[3, {name: "Blocks"}],
					[4, {name: "PrismStone"}],
					[3, {name: "RockCage"}],
					[4, {name: "TwoLargeSetPiece"}],
					[1, {name: "NightmareScenario"}],
					[3, {name: "PrismRock"}],
					[4, {name: "VRock"}],
					[4, {name: "DoubleRock"}],
					[4, {name: "Separated"}],
				],
			},	
			treasure: {
				rooms: [
				
					[1, {name: "CursedRelics", door: door.locked}],
					[3, {name: "JustTreasure01"}],
					[3, {name: "BlocksNRocks", noExit: direction.north}],
					[2, {name: "HealthLever"}],
					[3, {name: "BlockedBridge", noExit: direction.north}],
					[3, {name: "BombPuzzle"}],
					[2, {name: "LeverBombs", noExit: direction.north}],
					[3, {name: "JustTreasure02", noExit: direction.nw}],
					[3, {name: "BurriedStuff"}],
					[2, {name: "SpikeSacrifice"}],
					[2, {name: "TorchPuzzle"}],
					[2, {name: "CaveCells", noExit: direction.ew}],
					[3, {name: "SecretShop", icon: icon.shop, door: door.crystal,
						requirements: (flag) => (
							flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode
						),
					}],
					[2, {name: "SpikePuzzle"}],
					[3, {name: "BulletRocks"}],
					[3, {name: "CoupleItems"}],
					[2, {name: "WalkWithFire", noExit: direction.west}],
					[1, {name: "Choice"}],
				],
			},
			secret: {
				rooms: [
					[3, {name: "Chest"}],
					[3, {name: "TallRocksChest"}],
					[3, {name: "Chest"}],
					[2, {name: "TorchPuzzle"}],
					[2, {name: "OvergrownStatuePuzzle"}],
					[2, {name: "3Chests", noExit: direction.north}],
					[1, {name: "Blessing"}],
					[3, {name: "Keys"}],
					[2, {name: "KeyBlocks"}],
					[2, {name: "TiledRoom"}],
					[2, {name: "SpikeSacrifice"}],
					[3, {name: "Bombs"}],
					[2, {name: "BlackRabbitShop"}],
					[3, {name: "Chest"}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[2, {name: "SpikeJump"}],
					[3, {name: "BulletChest"}],
					[2, {name: "Potions"}],
					[3, {name: "Chests"}],
					[2, {name: "SpikeSacrifice"}],
					[1, {name: "Blessing"}],
					[1, {name: "Altar"}],
					[1, {name: "DoubleBigChest"}],
					[3, {name: "Small"}],
					[2, {name: "Gap"}],
					[3, {name: "TwoItems"}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},
			special: {
				rooms: [
					{
						name: "PonzuEntrance",
						icon: icon.boss,
						tag: "down_crystallord",
						requirements: (flag) => (
							flag.storyMode
						),
					},
					{
						name: "RelicAltar",
						icon: icon.relicAltar,
						tag: "relic_altar",
						upgrade: "relicAltar",
						requirements: (flag) => (
							!flag.altar_encountered && !flag.whip_enabled
						),
					},
				],
			},
			challange: {
				rooms: [
					[1, {name: "GamblingRoom", icon: icon.shopBR}],
					[1, {name: "Combat", icon: icon.combat}],
				],
			},
		},
	},
	core: {
		small: {
			begin: {
				rooms: [
					[1, {name: "Plain"}],
					[1, {name: "MoltenGold"}],
					[1, {name: "Pillars"}],
					[1, {name: "Holes"}],
					[1, {name: "Blocks"}],
				],
				shared: {
					icon: icon.start,
					sequence: {tag: "hoodie_entrance", direction: direction.north,
						requirements: (flag) => (
							flag.storyMode
						),
					},
				},
			},
			end: {
				rooms: [
					[1, {name: "End", tag:"end"}],
					[1, {name: "Boss", icon: icon.boss, tag: "end_boss"}],
				],
				shared: {
					icon: icon.exit,
				},
			},
			normal: {
				rooms: [
					[5, {name: "Empty"}],
					[4, {name: "Corners"}],
					[4, {name: "BowTie", noExit: direction.ns}],
					[4, {name: "Razor", noExit: direction.ew}],
					[4, {name: "Hole"}],
					[4, {name: "Pillar"}],
					[4, {name: "HoleNS"}],
					[4, {name: "Spikes"}],
					[1, {name: "VerticalHallHazard", noExit: direction.ew}],
					[3, {name: "TSectionEast", noExit: direction.west}],
					[3, {name: "TSectionWest", noExit: direction.east}],
					[3, {name: "TSectionNorth", noExit: direction.south}],
					[3, {name: "TSectionSouth", noExit: direction.north}],
					[2, {name: "EastWestSpikes", noExit: direction.ns}],
					[3, {name: "DiagonalHole"}],
					[2, {name: "GoldPuddle"}],
					[2, {name: "GoldPuddleNS"}],
					[1, {name: "GoldPuddleCrossRoads"}],
					[4, {name: "CentralPillar"}],
					[4, {name: "Diamond"}],
					[3, {name: "GoldRiver"}],
					[4, {name: "MovingBlocks"}],
					[4, {name: "MovingTorches"}],
					[3, {name: "MovingVents"}],
					[3, {name: "CornerRocks"}],
					[5, {name: "Slant"}],
					[2, {name: "BridgeEW", noExit: direction.ns}],
				],
			},		
			special: {
				rooms: [
					{
						name: "Entrance",
						icon: icon.exit,
						tag: "core_entrance",
						noExit: direction.new,				
						requirements: (flag) => (
							flag.storyMode
						),
					},
				],
			},
			relic: {
				rooms: [
					[1, {name: "Blocks"}],
					[1, {name: "GoldPool", noExit: direction.north}],
					[1, {name: "Basic"}],
					[1, {name: "TorchPuzzle"}],
				],
				shared: {
					icon: icon.relicOn,
					door: door.locked,
					requirements: (flag) => (
						!flag.itemFreedom
					),
				},
				unlocked: {
					shared: {
						door: door.normal,
					},
				},
			},
			treasure: {
				rooms: [
					[4, {name: "JustTreasure"}],
					[4, {name: "GoldFlow", noExit: direction.north}],
					[3, {name: "WestWall", noExit: direction.west}],
					[3, {name: "EastWall", noExit: direction.east}],
					[3, {name: "NorthWall", noExit: direction.north}],
					[3, {name: "SouthWall", noExit: direction.south}],
					[3, {name: "Spikes"}],
					[4, {name: "Rocked"}],
					[3, {name: "SpikeSacrifice"}],
					[4, {name: "BombPuzzle"}],
					[1, {name: "CursedRelics"}],
					[3, {name: "CrossBlock"}],
					[4, {name: "LongReach", noExit: direction.west}],
					[4, {name: "AlternateLongReach", noExit: direction.east}],
					[3, {name: "GOLD", noExit: direction.north}],
					[3, {name: "TreasureSwitch"}],
					[3, {name: "DoubleChest"}],
					[3, {name: "HealthLever"}],
				],
			},
			secret: {
				rooms: [
					[4, {name: "Chest"}],
					[4, {name: "Cookout"}],
					[2, {name: "SpikeSacrifice"}],
					[3, {name: "GoldRoom"}],
					[3, {name: "BombPuzzleSmall"}],
					[1, {name: "Nuggs"}],
					[1, {name: "Altar"}],
					[1, {name: "LockedAltar", noExit: direction.north}],
					[3, {name: "Insulated"}],
					[2, {name: "Tent"}],
					[4, {name: "Bombs"}],
					[4, {name: "Keys"}],
					[3, {name: "Blessing", noExit: direction.west}],
					[2, {name: "PressurePlate", noExit: direction.ne}],
					[2, {name: "GoldRocks"}],
					[2, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[4, {name: "Chest"}],
					[3, {name: "CursedTorch"}],
					[3, {name: "SpikeSacrifice"}],
					[4, {name: "Chest02"}],
					[2, {name: "SecretRoom",
						sequence: {tag: "secret", direction: direction.west},
					}],
					[2, {name: "KeyPillar"}],
					[1, {name: "Altar"}],
					[3, {name: "Blessing"}],
					[4, {name: "Item"}],
					[2, {name: "Lab"}],
					[3, {name: "SkeletonRocks"}],
					[4, {name: "CookedFood"}],
					[2, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},			
			altar: {
				rooms: [
					[1, {name: "Torches"}],
					[1, {name: "Golden"}],
					[1, {name: "Pillars"}],
					[1, {name: "Flow", noExit: direction.east}],
					[1, {name: "LongBridge", noExit: direction.nsw}],
				],
				shared: {
					icon: icon.altarOn,
					sequence: {
						tag: "altar_guacamole",
						requirements: (flag) => (
							flag.guacamole
						),
					},
					weightedDoor: [
						[1, {door: door.normal}],
						[1, {door: door.locked}],
					],
					requirements: (flag) => (
						flag.priestess_met > 2
					),
				},
				locked: {
					shared: {
						weightedDoor: null,
						door: door.locked,
						sequence: {
							tag: "altar_guacamole",
						},
					},
				},
				guacamole: {
					shared: {
						weightedDoor: null,
						sequence: null,
						requirements: (flag) => (
							flag.guacamole
						),
					},
				},						
			},
		},
		large: {
			normal: {
				rooms: [
					[4, {name: "Empty"}],
					[4, {name: "Corners"}],
					[3, {name: "CentralPillar"}],
					[3, {name: "CornerHole"}],
					[2, {name: "NSBridge", noExit: direction.ew}],
					[2, {name: "EWSBridge", noExit: direction.north}],
					[2, {name: "EWNBridge", noExit: direction.south}],
					[4, {name: "VerticalHole"}],
					[3, {name: "ZHole"}],
					[3, {name: "GoldCorners"}],
					[3, {name: "NorthLedge", noExit: direction.north}],
					[3, {name: "SouthLedge", noExit: direction.south}],
					[4, {name: "Cross"}],
					[3, {name: "NECorner", noExit: direction.sw}],
					[3, {name: "NWCorner", noExit: direction.es}],
					[3, {name: "SECorner", noExit: direction.nw}],
					[3, {name: "SWCorner", noExit: direction.ne}],
					[4, {name: "CornerHoles"}],
					[2, {name: "NSArena", noExit: direction.ew}],
					[2, {name: "NSDonut", noExit: direction.ew}],
					[2, {name: "SpikeBridgeEW", noExit: direction.ns}],
					[3, {name: "NorthGoldPool", noExit: direction.north}],
					[3, {name: "AlternateCross"}],
					[3, {name: "Quotes"}],
					[3, {name: "GoldHotdogs"}],
					[3, {name: "GoldTriangle"}],
					[3, {name: "GoldRiver"}],
					[4, {name: "VentSetpeice"}],
					[3, {name: "Checkboard"}],
					[3, {name: "SkeletonRockPuddle"}],
					[2, {name: "RollerBridgeEW", noExit: direction.ns}],
					[3, {name: "Snake"}],
					[4, {name: "SingleSetPiece"}],
					[2, {name: "DoubleSetPiece"}],
					[4, {name: "RockTriangles"}],
					[4, {name: "CentralPillar"}],
					[4, {name: "StubbyPillars"}],
					[3, {name: "Ruins"}],
					[3, {name: "SmallHoles"}],
					[3, {name: "ArrowMaze"}],
					[3, {name: "ThornPillars"}],
					[4, {name: "CornerVents"}],
					[2, {name: "RollerHall"}],
					[3, {name: "GoldIsland"}],
					[3, {name: "CornerHall"}],
					[4, {name: "CornerPillar"}],
				],
			},	
			treasure: {
				rooms: [				
					[4, {name: "JustTreasure01"}],
					[4, {name: "BombPuzzle"}],
					[3, {name: "SpikeSacrifice"}],
					[3, {name: "Gold"}],
					[4, {name: "JustTreasure02"}],
					[2, {name: "River"}],
					[2, {name: "TorchPuzzle"}],
					[2, {name: "SecretShop", icon: icon.shop, door: door.crystal,
						requirements: (flag) => (
							flag.peasant2_unlocked && (flag.dibble_upgrade_count < 4) && flag.storyMode
						),
					}],
					[3, {name: "BridgeChest", noExit: direction.east}],
					[2, {name: "HealthLever"}],
					[3, {name: "RollerBridge", noExit: direction.north}],
					[3, {name: "Rollers"}],
					[1, {name: "CursedRelics"}],
					[4, {name: "Items"}],
					[3, {name: "Choice"}],
					[3, {name: "DoubleSetPiece"}],
				],
			},
			secret: {
				rooms: [
					[4, {name: "Chest"}],
					[2, {name: "BlackRabbitShop"}],
					[3, {name: "BurriedChests", noExit: direction.north}],
					[1, {name: "Altar"}],
					[3, {name: "TwoChests"}],
					[3, {name: "SpikeSacrifice"}],
					[3, {name: "Blessing"}],
					[3, {name: "RollerBridge", noExit: direction.east}],
					[4, {name: "RollerBidgeNSItems", noExit: direction.ew}],
					[3, {name: "Gold"}],
					[2, {name: "Talisman"}],
					[4, {name: "Bombs"}],
					[3, {name: "KeyBlocks", noExit: direction.south}],
					[4, {name: "Chest02"}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[4, {name: "GoldFlowEast"}],
					[4, {name: "GoldFlowWest"}],
					[4, {name: "GoldMoat"}],
					[3, {name: "RockMaze"}],
					[3, {name: "GoldLake"}],
					[2, {name: "TinyRoom"}],
					[3, {name: "RollerJumps"}],
					[3, {name: "SmallSpikeSacrifice"}],
					[3, {name: "RockedIn"}],
					[2, {name: "Blessing"}],
					[1, {name: "Altar"}],
					[3, {name: "TorchPuzzle", sequence: {
							tag: "secret", chance: 0.5, direction: direction.east
						},
					}],
					[4, {name: "Food"}],
					[4, {name: "DoubleChestItem"}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},
			special: {
				rooms: [
					{
						name: "SeerEntrance",
						icon: icon.boss,
						tag: "down_firelord",
						requirements: (flag) => (
							flag.storyMode
						),
					},
					{
						name: "RelicAltar",
						icon: icon.relicAltar,
						tag: "relic_altar",
						upgrade: "relicAltar",
						requirements: (flag) => (
							!flag.altar_encountered && !flag.whip_enabled
						),
					},
				],
			},
			challange: {
				rooms: [
					[1, {name: "GamblingRoom", icon: icon.shopBR}],
					[1, {name: "Combat", icon: icon.combat}],
				],
			},
		},
	},
	bog: {
		small: {
			begin: {
				rooms: [
					[2, {name: "Plain"}],
					[2, {name: "Tiled"}],
					[2, {name: "Statues"}],
					[2, {name: "Holes"}],
					[2, {name: "Ruins"}],
					[1, {name: "PressurePlate"}],
				],
				shared: {
					icon: icon.start,
					sequence: {tag: "hoodie_entrance", direction: direction.north,
						requirements: (flag) => (
							flag.storyMode
						),
					},
				},
			},
			end: {
				rooms: [
					[1, {name: "End", tag:"end"}],
					[1, {name: "Boss", icon: icon.boss, tag: "end_boss"}],
				],
				shared: {
					icon: icon.exit,
				},
			},
			normal: {
				rooms: [
					[3, {name: "Empty"}],
					[3, {name: "Wet"}],
					[3, {name: "CornerHoles"}],
					[3, {name: "VariableCorners"}],
					[3, {name: "StatuePond"}],
					[3, {name: "DoubleStatue"}],
					[3, {name: "Creek"}],
					[3, {name: "RockCorners"}],
					[3, {name: "LongHole"}],
					[3, {name: "OffsetHoles"}],
					[3, {name: "OffsetTallRocks"}],
					[3, {name: "Checkered"}],
					[3, {name: "PileOfRocks"}],
					[3, {name: "EastHole"}],
					[3, {name: "WestHole"}],
					[3, {name: "Creek"}],
					[3, {name: "CrossHole"}],
					[3, {name: "Torches"}],
				],
			},		
			special: {
				rooms: [
					{
						name: "Entrance",
						icon: icon.exit,
						tag: "bog_entrance",
						door: door.iron,
						noExit: direction.new,				
						requirements: (flag) => (
							flag.storyMode
						),
					},
				],
			},
			relic: {
				rooms: [
					[1, {name: "Trees"}],
					[1, {name: "Ruins"}],
					[1, {name: "Water"}],
					[1, {name: "Pillars", noExit: direction.south}],
					[1, {name: "Torches"}],
					[1, {name: "Bridge", noExit: direction.nsw}],
				],
				shared: {
					icon: icon.relicOn,
					door: door.locked,
					requirements: (flag) => (
						!flag.itemFreedom
					),
				},
			},
			relicUnlocked: {
				rooms: [
					[1, {name: "Trees"}],
					[1, {name: "Ruins"}],
					[1, {name: "Water"}],
					[1, {name: "Bridge", noExit: direction.nsw}],				
					[1, {name: "Torches"}],
					[1, {name: "Pillars", noExit: direction.south}],
					
				],
				shared: {
					icon: icon.relicOn,
					door: door.locked,
					requirements: (flag) => (
						!flag.itemFreedom
					),
				},
			},
			treasure: {
				rooms: [
					[3, {name: "JustTreasure"}],
					[3, {name: "JustTreasure02"}],
					[2, {name: "BlocksRocks", noExit: direction.north}],
					[2, {name: "HoleWest", noExit: direction.nes}],
					[2, {name: "HoleEast", noExit: direction.nsw}],
					[1, {name: "HealthLever"}],
					[2, {name: "BombPuzzle"}],
					[3, {name: "PlantPath", noExit: direction.north}],
					[3, {name: "PressurePlate"}],
					[2, {name: "RockedIn"}],
					[3, {name: "Cross"}],
					[2, {name: "SwitchCost", noExit: direction.ns}],
					[2, {name: "SwitchCost02"}],
				],
			},
			secret: {
				rooms: [
					[4, {name: "Chest"}],
					[3, {name: "BridgeEast", noExit: direction.nes}],
					[3, {name: "BridgeWest", noExit: direction.nsw}],
					[3, {name: "BombPuzzle", noExit: direction.north}],
					[3, {name: "TorchPuzzle"}],
					[3, {name: "CornerItem", noExit: direction.sw}],
					[3, {name: "Nugg"}],
					[2, {name: "Bard", noExit: direction.west,
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
					[1, {name: "HealthLever"}],
					[2, {name: "RuinsChest"}],
					[1, {name: "Altar"}],
					[2, {name: "SpikeSacrifice"}],
					[3, {name: "RockedPotions"}],
					[2, {name: "Tent"}],
					[3, {name: "FlowerItem"}],
					[2, {name: "CursedTorch"}],
					[4, {name: "BridgeItem"}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
				
					[3, {name: "Chest"}],
					[2, {name: "SpikeSacrifice"}],
					[1, {name: "DoubleChestLockedIn"}],
					[2, {name: "Potion"}],
					[2, {name: "TinyIsland"}],
					[3, {name: "PondItem"}],
					[2, {name: "CursedTorch"}],
					[1, {name: "Altar"}],
					[3, {name: "BombStash"}],
					[3, {name: "KeyStash"}],
					[2, {name: "CursedRelic"}],
					[2, {name: "LootTree"}],
					[1, {name: "Blessing"}],
					[2, {name: "RockedInChests"}],
					[2, {name: "Bard",
						requirements: (flag) => (
							!flag.bard_met
						),
					}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},			
			altar: {
				rooms: [
					[1, {name: "Torches"}],
					[1, {name: "Woods"}],
					[1, {name: "Hole"}],
					[1, {name: "Tiny", noExit: direction.new}],
					[1, {name: "TiledRoom"}],
					[1, {name: "Water"}],
				],
				shared: {
					icon: icon.altarOn,
					sequence: {
						tag: "altar_guacamole",
						requirements: (flag) => (
							flag.guacamole
						),
					},
					weightedDoor: [
						[1, {door: door.normal}],
						[1, {door: door.locked}],
					],
					requirements: (flag) => (
						flag.priestess_met > 2
					),
				},				
			},
			altarLocked: {
				rooms: [
					[1, {name: "Woods"}],
					[1, {name: "Torches"}],					
					[1, {name: "Hole"}],					
					[1, {name: "Tiny", noExit: direction.new}],
					[1, {name: "TiledRoom"}],
					[1, {name: "Water"}],
				],
				shared: {
					icon: icon.altarOn,
					door: door.locked,
					sequence: {
						tag: "altar_guacamole",
						requirements: (flag) => (
							flag.guacamole
						),
					},
					requirements: (flag) => (
						flag.priestess_met > 2
					),
				},
			},
			altarGuacamole: {
				rooms: [
					[1, {name: "Torches"}],					
					[1, {name: "Hole"}],
					[1, {name: "Woods"}],
					[1, {name: "Tiny", noExit: direction.new}],
					[1, {name: "TiledRoom"}],
					[1, {name: "Water"}],
				],
				shared: {
					icon: icon.altarOn,
					requirements: (flag) => (
						flag.priestess_met > 2
					),
				},
			},
		},
		large: {
			normal: {
				rooms: [
					[3, {name: "Empty"}],
					[3, {name: "HoleStatue"}],
					[3, {name: "RockTorch"}],
					[3, {name: "Tiles"}],
					[3, {name: "Water"}],
					[3, {name: "BowTie", noExit: direction.ns}],
					[3, {name: "Razor", noExit: direction.ew}],
					[3, {name: "VerticalHoles"}],
					[3, {name: "WindingHole"}],
					[3, {name: "RockPile"}],
					[3, {name: "CenterPillars"}],
					[3, {name: "GrassyPond"}],
					[3, {name: "CornerNW", noExit: direction.es}],
					[3, {name: "CornerNE", noExit: direction.sw}],
					[3, {name: "CornerSW", noExit: direction.ne}],
					[3, {name: "CornerSE", noExit: direction.nw}],
					[3, {name: "CheckeredHoles"}],
					[3, {name: "BlocksTiles"}],
					[3, {name: "Forest"}],
					[3, {name: "CurveNE", noExit: direction.west}],
					[3, {name: "CurveNW", noExit: direction.east}],
					[3, {name: "CurveSE", noExit: direction.west}],
					[3, {name: "CurveSW", noExit: direction.east}],
					[3, {name: "DeadlyBridge", noExit: direction.ew}],
					[3, {name: "WiderBridge", noExit: direction.ew}],
					[3, {name: "NorthHole"}],
					[3, {name: "Bridges"}],
					[3, {name: "ArrowTrap"}],
					[3, {name: "ElaborateTrap"}],
					[3, {name: "NorthEastHole", noExit: direction.east}],
					[3, {name: "SouthWestHole", noExit: direction.west}],
					[3, {name: "Rainbow", noExit: direction.south}],
					[3, {name: "Ruins01"}],
					[3, {name: "Ruins02"}],
					[3, {name: "Ruins03"}],
					[3, {name: "Ruins04"}],
					[3, {name: "Ruins05a"}],
					[3, {name: "Ruins05b"}],
					[3, {name: "Ruins06"}],
					[3, {name: "HiddenFun"}],
					[3, {name: "Trees"}],
					[3, {name: "Plaza"}],
					[3, {name: "TreeNest"}],
					[3, {name: "TreeGrid"}],
					[3, {name: "TreeHole"}],
					[3, {name: "RockMaze"}],
				],
			},	
			treasure: {
				rooms: [				
					[3, {name: "JustTreasure01"}],
					[3, {name: "HoleRocks"}],
					[2, {name: "ArrowTrapHole"}],
					[3, {name: "DenseForest"}],
					[2, {name: "ToughJumps"}],
					[2, {name: "Plates"}],
					[2, {name: "Plaza"}],
					[2, {name: "Pond"}],
					[3, {name: "Spikes"}],
					[3, {name: "Overgrown", noExit: direction.west}],
					[1, {name: "DangerHallway"}],
					[2, {name: "FourTorches"}],
					[2, {name: "BombPuzzle"}],
					[1, {name: "LotsOfStuff"}],
					[2, {name: "SpikeSacrifice"}],
					[3, {name: "HoleSwitch", noExit: direction.nes}],
					[3, {name: "JustTreasure02"}],
					[2, {name: "SpikeCourse", noExit: direction.ew}],
					[3, {name: "Bridge", noExit: direction.nsw}],
					[1, {name: "JustTreasureSmall", noExit: direction.new}],
					[2, {name: "AllOrNothing"}],
					[2, {name: "SpookyFourTorches"}],
				],
			},
			secret: {
				rooms: [
					[3, {name: "Chest"}],
					[1, {name: "Altar"}],
					[1, {name: "Camp", noExit: direction.ne}],
					[2, {name: "PressureItems"}],
					[2, {name: "BlackRabbitShop"}],
					[1, {name: "Blessing"}],
					[2, {name: "RockedItems"}],
					[2, {name: "RockedItems02", noExit: direction.ew}],
					[3, {name: "Bombs"}],
					[3, {name: "Food"}],
					[3, {name: "Keys"}],
					[2, {name: "PoisonedItems"}],
					[2, {name: "BlockLever"}],
					[3, {name: "Diamond"}],
				],
				shared: {
					icon: icon.secret,
					door: door.secret,
					reqursion: 1,
					sequence: {tag: "secret", chance: 0.25,
						requirements: (flag) => (
							flag.itemCircinus
						),
					},
				},
			},
			hidden: {
				rooms: [
					[1, {name: "Altar"}],
					[1, {name: "Blessing"}],
					[1, {name: "DoubleLockedChest"}],
					[2, {name: "CookedFood"}],
					[2, {name: "OopsAllTorches"}],
					[2, {name: "GoldTree"}],
					[2, {name: "Series"}],
					[2, {name: "SpikeSacrifice"}],
					[3, {name: "SpikeIsland"}],
				],
				shared: {
					door: door.hidden,
					subFloor:1,
				},
			},
			special: {
				rooms: [					
					{
						name: "RelicAltar",
						icon: icon.relicAltar,
						tag: "relic_altar",
						upgrade: "relicAltar",
						requirements: (flag) => (
							!flag.altar_encountered && !flag.whip_enabled
						),
					},
					{
						name: "PlunderKingEntrance",
						icon: icon.boss,
						tag: "down_pk",
						requirements: (flag) => (
							flag.storyMode
						),
					},
					{
						name: "QueensRoom",
						tag: "queen_room",
						icon: icon.none,
						requirements: (flag) => (
							!flag.whip_enabled
						),
					},
					{
						name: "RoyalRoad_4",
						tag: "royal_road_4",
						requirements: (flag) => (
							!flag.whip_enabled
						),
					},
					{
						name: "RoyalRoad_2",
						tag: "royal_road_2",
						requirements: (flag) => (
							!flag.whip_enabled
						),
					},
					{
						name: "RoyalRoad_3",
						tag: "royal_road_3",
						requirements: (flag) => (
							!flag.whip_enabled
						),
					},
					{
						name: "RoyalRoad_0",
						tag: "royal_road_0",
						requirements: (flag) => (
							!flag.whip_enabled
						),
						sequence: [
							{tag:" royal_road_1", direction: direction.east},
							{tag:" royal_road_2", direction: direction.north},
							{tag:" royal_road_3", direction: direction.west},
							{tag:" royal_road_4", direction: direction.north},
							{tag:" queen_room", direction: direction.north},
						],						
					},
					{
						name: "RoyalRoad_1",
						tag: "royal_road_1",
						requirements: (flag) => (
							!flag.whip_enabled
						),
					},
				],
				shared: {
					icon: icon.secret,
				},
			},
			challange: {
				rooms: [
					[1, {name: "GamblingRoom", icon: icon.shopBR}],
					[1, {name: "Combat", icon: icon.combat}],
				],
			},
		},
	},
	shop: {
		shop: {
			shop: {
				rooms: [
					[1, {name: "Encounter_Shop", tag: "pilfer_shop"}],
					[1, {name: "Encounter_Shop_OM", tag: "pilfer_shop, shop_om"}],
					[1, {name: "Encounter_Market_Baby", tag: "pilfer_shop, market_baby"}],
					{
						weight: 1,
						name: "Encounter_Market",
						tag: "pilfer_shop, market",
						sequence: [
							{tag: "market_baby"},
							{tag: "market_baby", direction: direction.east},
						],
					},
					{
						weight: 1,
						name: "Encounter_StoreRoom",
						icon: icon.none,
						tag: "shop_storeroom",
						subFloor:1,
						door: door.hidden,
						requirements: (flag) => (
							flag.rougeMode
						)
					},
				],
				shared: {
					icon: icon.shop,					
				},
			},
		},
	},
	blackRabbit: {
		blackRabbit: {
			blackRabbit: {
				rooms: [
					[4, {name: "Encounter_BR_Shop"}],
					[1, {name: "Encounter_BR_TreasureGame"}],
					[1, {name: "Encounter_BR_LeverGame", tag: "test"}],
				],
				shared: {
					icon: icon.shopBR,
					requirements: (flag) => (
						flag.black_rabbit_met
					)
				},					
			},
		},
	},
}