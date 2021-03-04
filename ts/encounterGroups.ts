const mineEncounterGroups =  Object.freeze({
    "Mine_Room_Small": {
        "begin": [
            {
                "weight":4,
                "name": "Mine_Small_Begin_Plain",
                "requirements":"",
                "sequence":{
                    "type": ["Mine_Room_Small"],
                    "tag": "hoodie_entrance",
                    "chance": 1,
                    "branchWeight": 1
                }
            }
        ],
        "normal_encounters": [
            {
                "weight":3,
				"name": "Mine_Small_Normal_MineCart",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_Pillar",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_PillarHole",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_PillarSpinner",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_RockWall",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_SouthNorthHole",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_StationarySpinners",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_BrokenCarts",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_StatueSpinner",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Normal_Bridge",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_EWSpinners",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_CornerHoles",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_DualPillar",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_Spikes",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_SpikePatch",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_PillarSpawner",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Small_Normal_SetPiece",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Normal_HoleEW",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Normal_HoleEWSpinner",
				"requirements":""
			},
            {
				"weight":4,
				"name": "Mine_Small_Normal_Plain",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Normal_HazardHeavy",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Normal_DangerWalls",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_TilePattern",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_CornerRocks",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Normal_RockPath",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_DiagonalHole",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_CenterTorches",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Normal_Ruins",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_Statues",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Normal_LargeSpinnerTrack",
				"requirements":""
            }
        ],
        "end_encounters":[
            {
				"weight":1,
				"name": "Mine_Small_End_Normal",
				"requirements":"",
				"m_value": "end"},
			{
				"weight":1,
				"name": "Mine_Small_End_Worm",
				"requirements":"end_worm",
				"m_value": "end_worm"},
			{
				"weight":1,
				"name": "Mine_Small_End_Tutorial",
				"requirements":"",
				"m_value": "end_tutorial"},
			{
				"weight":1,
				"name": "Mine_Small_End_Boss",
				"requirements":"",
				"m_value": "end_boss"
            }
        ],
        "relic_encounters_unlocked" :[
            {
				"weight":4,
				"name": "Mine_Small_Relic_Locked_Pots",
				"requirements":""
			},
			{
				"weight":4,
				"name": "Mine_Small_Relic_Locked_Torches",
				"requirements":""
			},
			{
				"weight":4,
				"name": "Mine_Small_Relic_Locked_Hole",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Small_Relic_Locked_TorchPuzzle",
				"requirements":""
			},
			{
				"weight":4,
				"name": "Mine_Small_Relic_Locked_Statues",
				"requirements":""
            }
        ],
        "relic_encounters": [
            {
				"weight":4,
				"name": "Mine_Small_Relic_Locked_Pots",
				"requirements":""
			},
			{
				"weight":4,
				"name": "Mine_Small_Relic_Locked_Torches",
				"requirements":""
			},
			{
				"weight":4,
				"name": "Mine_Small_Relic_Locked_Hole",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Small_Relic_Locked_TorchPuzzle",
				"requirements":""
			},
			{
				"weight":4,
				"name": "Mine_Small_Relic_Locked_Statues",
				"requirements":""
            }
        ],
        "special_encounters":[
            {
				"weight":1,
				"name": "Mine_Small_Special_DodsonCage",
				"requirements":"peasant1_unlocked == 0",
				"m_value": "DodsonCageEncounter"
            },
            {
				"weight":1,
				"name": "Mine_Small_Special_WaylandShop",
				"requirements":"blacksmith_rescued == 0",
				"m_value": "waylandshop"
            },
            {
				"weight":1,
				"name": "Mine_Small_Special_WaylandShopHallway",
				"requirements":"blacksmith_rescued == 0",
				"m_value": "waylandshophallway"
            },
            {
				"weight":1,
				"name": "Mine_Small_Special_MushroomFamily",
				"requirements":"mushroom_green == 0, apprentice_met > 0",
				"m_value": "mushroom"
            },
            {
				"weight":1,
				"name": "Mine_Small_Special_MushroomFarm",
				"requirements":"mushroom_blue == 0, apprentice_met > 0",
				"m_value": "mushroom"
            },
            {
				"weight":1,
				"name": "Mine_Small_Special_BlackRabbit",
				"requirements":true,
				"m_value": "black_rabbit_first"
            },
            {
				"weight":1,
				"name": "Mine_Small_Special_Hoodie_Unlocked",
				"requirements":false,
				"m_value": "hoodie_entrance"
            },
            {
				"weight":1,
				"name": "Mine_Small_Special_TributeFountain",
				"requirements":"tribute_fountain_encountered == 0, bog_unlocked > 0",
				"m_value": "tribute_fountain"
            }
        ],
        "secret":[
            {
				"weight":4,
				"name": "Mine_Small_Secret_WaterChest",
				"requirements":""
			},
            {
				"weight":4,
				"name": "Mine_Small_Secret_Carts",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Small_Secret_Altar",
				"requirements":""
			},
            {
                "weight":3,
                "name": "Mine_Small_Secret_CursedTorch",
                "requirements":"",
                "sequence":{
                    "type": ["Mine_Room_Small",
				"Mine_Room_Large"],
                    "tag": "secret",
                    "chance": 0.25,
                    "branchWeight": 0,
                    "skip": true
                }
            },
            {
                "weight":3,
                "name": "Mine_Small_Secret_Crystals",
                "requirements":""
            },
            {
                "weight":4,
                "name": "Mine_Small_Secret_Chest",
                "requirements":""
            },
            {
                "weight":3,
				"name": "Mine_Small_Secret_SpikeSacrifice",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Small_Secret_Blessing",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Secret_Items",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Secret_Chest",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Secret_ChestCommon",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Secret_KeyBlock",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Secret_Bombs",
				"requirements":""
			},
            {
				"weight":10,
				"name": "Mine_Small_Secret_DogShadow",
				"requirements":"delve_count>5, dog_shadow_found == 0"
            },
            {
				"weight":2,
				"name": "Mine_Small_Secret_LeverBlocks",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Small_Secret_Tent",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Secret_Nugg",
				"requirements":""
			},
            {
                "weight":3,
                "name": "Mine_Small_Secret_Bard",
                "requirements":false,
                "sequence":{
                    "type": ["Mine_Room_Small",
				"Mine_Room_Large"],
                    "tag": "secret",
                    "chance": 0.25,
                    "branchWeight": 0,
                    "skip": true
                }
            },
            {
				"weight":3,
				"name": "Mine_Small_Secret_TributeFountain",
				"requirements":false
            }
        ],
        "hidden": [
            {
				"weight":3,
				"name": "Mine_Small_Hidden_WaterChest",
				"requirements":""
			},
			{
				"weight":3,
				"name": "Mine_Small_Hidden_Carts",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Small_Hidden_TreasureHunt",
				"requirements":{
					"key":"secret_treasure_note",
					"mod":"==",
					"value": "0"
				}
			},
			{
				"weight":1,
				"name": "Mine_Small_Hidden_Altar",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Small_Hidden_CursedTorch",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Small_Hidden_CursedRelic",
				"requirements":""
			},
			{
				"weight":3,
				"name": "Mine_Small_Hidden_Crystals",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Small_Hidden_Lab",
				"requirements":""
			},
			{
				"weight":3,
				"name": "Mine_Small_Hidden_Chest",
				"requirements":""
			},
			{
				"weight":3,
				"name": "Mine_Small_Hidden_SpikeSacrifice",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Small_Hidden_Blessing",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Small_Hidden_Blessing02",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Small_Hidden_ButchersRoom",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Small_Hidden_RatFriendship",
				"requirements": {
					"key":"ratLoveDiscovered",
					"mod": "==",
					"value": 0
				}
            },
			{
				"weight":3,
				"name": "Mine_Small_Hidden_Chest",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Small_Hidden_Bard",
				"requirements": {
					"key":"bardMet",
					"mod":">",
					"value": 0
				}
            }
        ],
        "treasure_encounters":[
            {
				"weight":3,
				"name": "Mine_Small_Treasure_Skeleton",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Treasure_Rocks",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Treasure_Spikes",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Treasure_HoleBridges",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Treasure_LockedRocks",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Treasure_StatuePuzzle",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Treasure_LockedBlocks",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Small_Treasure_CursedRelics",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Treasure_SpikeCage",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Small_Treasure_RockCage",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Small_Treasure_SpikeSacrifice",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Treasure_DiagonalRocks",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Treasure_HealthLever",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Small_Treasure_Pillar",
				"requirements":""
			}
        ],
        "altar":[
            {
                "weight":2,
                "name": "Mine_Small_Altar_Torches",
                "requirements":false,
                "sequence":{
                    "type": ["Mine_Room_Small"],
                    "tag": "altar_guacamole",
                    "chance": 1,
                    "branchWeight": 1
                }
            },
            {
                "weight":2, 
                "name": "Mine_Small_Altar_Statues", 
                "requirements":false,
                "sequence":{
                    "type": ["Mine_Room_Small"],
                    "tag": "altar_guacamole",
                    "chance": 1,
                    "branchWeight": 1
                }
            },
            {
                "weight":2, 
                "name": "Mine_Small_Altar_Bridges", 
                "requirements":false,
                "sequence":{
                    "type": ["Mine_Room_Small"],
                    "tag": "altar_guacamole",
                    "chance": 1,
                    "branchWeight": 1
                }
            },
            {
                "weight":2, 
                "name": "Mine_Small_Altar_Tiled",
                 "requirements":false,
                 "sequence":{
                    "type": ["Mine_Room_Small"],
                    "tag": "altar_guacamole",
                    "chance": 1,
                    "branchWeight": 1
                }
            }
        ],
        "altar_locked":[
            {
				"weight":2,
				"name": "Mine_Small_Altar_Torches",
				"requirements":{key: "guacamole", mod: ">", value:0}
            },
            {
				"weight":2,
				"name": "Mine_Small_Altar_Statues",
				"requirements":{key: "guacamole", mod: ">", value:0}
            },
            {
				"weight":2,
				"name": "Mine_Small_Altar_Bridges",
				"requirements":{key: "guacamole", mod: ">", value:0}
            },
            {
				"weight":2,
				"name": "Mine_Small_Altar_Tiled",
				"requirements":{key: "guacamole", mod: ">", value:0}
            }
        ],
        "altar_guacamole":[
            {
				"weight":2,
				"name": "Mine_Small_Altar_Torches",
				"requirements":{
					"key": "guacamole",
					"mod": ">",
					"value":0
				}
            },
            {
				"weight":2,
				"name": "Mine_Small_Altar_Statues",
				"requirements":{
					"key": "guacamole",
					"mod": ">",
					"value":0
				}
            },
            {
				"weight":2,
				"name": "Mine_Small_Altar_Bridges",
				"requirements":{
					"key":"guacamole",
					"mod": ">",
					"value":0
				}
            },
            {
				"weight":2,
				"name": "Mine_Small_Altar_Tiled",
				"requirements":{
					"key": "guacamole",
					"mod": ">",
					"value":0
				}
            }
        ]
    },
    "Mine_Room_Large": {
        "normal_encounters": [
            {
				"weight":2,
				"name": "Mine_Large_Normal_RailStatues",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_LargeRail",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_HoleBridge",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_RailSnake",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_Staging",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_PillarRocks",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_SpikeDonut",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_RailBrideLoop",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_RailBridge",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Large_Normal_OilBarrels",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_MineField",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_Bridges",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_Spikes",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_CornerNE",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Large_Normal_LandBridgeNS",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_DualPillars",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_SpikeBridge",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_CornerSW",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_RockCross",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_SlotHoles",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_RockColumns",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_ATrack",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_DynamicHole",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_TeeRocks",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_HoleArrows",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Large_Normal_DualSetPiece",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_Arena",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_ArenaTrack",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_QuadPillars",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_RockArrowMaze",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_RailGuantlet",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_HazardHeavy",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_ArrowGuantlet",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_DonutSpinner",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_CornerRocks",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_TeeJunction",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_CornerBridge",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_BridgeHole",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_BigRocks",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_TriangleRocks",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_SnakeBridge",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_RandomBlocks",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_Empty",
				"requirements":""
			},
            {
				"weight":4,
				"name": "Mine_Large_Normal_TwoSetPiece",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_Grassy",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_FivePillars",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Large_Normal_SnakeTrack",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Normal_Torches",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Normal_RailIslands",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Large_Normal_MushroomGrowOp",
				"requirements":""
            }
        ],
        "secret": [
            {
				"weight":5,
				"name": "Mine_Large_Secret_GrassChests",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Large_Secret_Altar",
				"requirements":""
			},
			{
				"weight":5,
				"name": "Mine_Large_Secret_Blessing",
				"requirements":""
			},
			{
				"weight":5,
				"name": "Mine_Large_Secret_BasicItems",
				"requirements":""
			},
			{
				"weight":5,
				"name": "Mine_Large_Secret_Gold",
				"requirements":""
			},
			{
				"weight":3,
				"name": "Mine_Large_Secret_BlackRabbitShop",
				"requirements":"black_rabbit_met"},
			{
				"weight":5,
				"name": "Mine_Large_Secret_Potion",
				"requirements":""
			},
			{
				"weight":5,
				"name": "Mine_Large_Secret_Chest",
				"requirements":""
			},
			{
				"weight":3,
				"name": "Mine_Large_Secret_CursedTorch",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Large_Secret_DangerousToGo",
				"requirements":"delve_count>8"},
			{
				"weight":5,
				"name": "Mine_Large_Secret_SpikedFood",
				"requirements":""
			},
			{
				"weight":3,
				"name": "Mine_Large_Secret_DoubleLockBlock",
				"requirements":""
			},
			{
				"weight":4,
				"name": "Mine_Large_Secret_StatueBombPuzzle",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Large_Secret_Pillars",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Large_Secret_OilyBridge",
				"requirements":""
            }
        ],
        "hidden": [
            {
				"weight":2,
				"name": "Mine_Large_Hidden_LeverBlocks",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Large_Hidden_GrassChests",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Large_Hidden_TorchPuzzle",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Large_Hidden_Keys",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Large_Hidden_Potions",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Large_Hidden_Blessing",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Large_Hidden_Blessing02",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Large_Hidden_CursedRelics",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Large_Hidden_Altar",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Large_Hidden_PressureTrap",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Large_Hidden_ChooseBlessing",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Large_Hidden_BobosLair",
				"requirements":""
			},
			{
				"weight":2,
				"name": "Mine_Large_Hidden_CaveIn",
				"requirements":""
			},
			{
				"weight":1,
				"name": "Mine_Large_Hidden_Gap",
				"requirements":""
            }
        ],
        "treasure_encounters":[
            {
				"weight":3,
				"name": "Mine_Large_Treasure_ItemBlocks",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Treasure_SpikedChest",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Treasure_HoleSpikeChest",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Treasure_TorchPuzzle",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Treasure_SpikeRails",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Treasure_BridgePuzzle",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Treasure_BombPuzzle",
				"requirements":""
			},
            {
				"weight":4,
				"name": "Mine_Large_Treasure_JustSomeTreasure",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Treasure_LeverBridge",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Treasure_VerticalBridge",
				"requirements":""
			},
            {
				"weight":4,
				"name": "Mine_Large_Treasure_Decision",
				"requirements":""
			},
            {
				"weight":3,
				"name": "Mine_Large_Treasure_HealthLever",
				"requirements":""
			},
            {
				"weight":5,
				"name": "Mine_Large_Treasure_SecretShop",
				"requirements":"peasant2_unlocked > 0, dibble_upgrade_count < 4"
            },
            {
				"weight":2,
				"name": "Mine_Large_Treasure_OilChest",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Treasure_FireyChest",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Treasure_ElectrifiedChest",
				"requirements":""
			},
            {
				"weight":4,
				"name": "Mine_Large_Treasure_JustSomeTreasure02",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Treasure_Nexus",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Large_Treasure_TwoBombsOneKey",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Treasure_SpikeSacrifice",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Treasure_Choice",
				"requirements":""
			},
            {
				"weight":2,
				"name": "Mine_Large_Treasure_DoubleRail",
				"requirements":""
			},
            {
				"weight":1,
				"name": "Mine_Large_Treasure_RockLock",
				"requirements":""}
        ]
    },
    "SleepyHoodyRoom": {
        "hoody": [
            {
				"weight":1,
				"name": "SleepyHoodyRoom",
				"requirements":false,
				"m_value": "hoodie_entrance"}
        ]
    },
    "direct": [
        {
				"weight":1,
				"name": "Mine_Small_Special_DodsonCage",
				"requirements":"peasant1_unlocked == 0",
				"m_value": "DodsonCageEncounter"},
        {
				"weight":1,
				"name": "Mine_Small_Special_WaylandShop",
				"requirements":"blacksmith_rescued == 0",
				"m_value": "waylandshop"},
        {
				"weight":1,
				"name": "Mine_Small_Special_WaylandShopHallway",
				"requirements":"blacksmith_rescued == 0",
				"m_value": "waylandshophallway"},
        {
				"weight":1,
				"name": "Mine_Small_Special_MushroomFamily",
				"requirements":"mushroom_green == 0, apprentice_met > 0",
				"m_value": "mushroom"},
        {
				"weight":1,
				"name": "Mine_Small_Special_MushroomFarm",
				"requirements":"mushroom_blue == 0, apprentice_met > 0",
				"m_value": "mushroom"},
        {
				"weight":1,
				"name": "Mine_Small_Special_BlackRabbit",
				"requirements":true,
				"m_value": "black_rabbit_first"},
        {
				"weight":1,
				"name": "Mine_Small_Special_Hoodie_Locked",
				"requirements":false,
				"m_value": "hoodie_entrance"},
        {
				"weight":1,
				"name": "Mine_Small_Special_Hoodie_Unlocked",
				"requirements":false,
				"m_value": "hoodie_entrance"},
        {
				"weight":1,
				"name": "Mine_Small_Special_TributeFountain",
				"requirements":false,
				"m_value": "tribute_fountain"},
        {
				"weight":1,
				"name": "Mine_Small_End_Normal",
				"requirements":"",
				"m_value": "end"},
		{
				"weight":1,
				"name": "Mine_Small_End_Worm",
				"requirements":"end_worm",
				"m_value": "end_worm"},
		{
				"weight":1,
				"name": "Mine_Small_End_Tutorial",
				"requirements":"",
				"m_value": "end_tutorial"},
		{
				"weight":1,
				"name": "Mine_Small_End_Boss",
				"requirements":"",
				"m_value": "end_boss"}
    ]

});