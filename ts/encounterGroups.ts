interface encounterGroups {
    [zone: string]: {
        [encounterGroup: string]:[
            {weight:number, roomName: string, roomTag?:string, requirement?: string, sequence?: 
                {roomTypes:string[], tag:string, branch?:number, chance?:number, requirement?:string, direction?:number}
            }
        ]
    }
}

const mineEncounterGroups =  Object.freeze({
    "mineSmall": {
        "begin"://46741
		[ 
            {weight:4, roomName: "Mine_Small_Begin_Plain", sequence://49980
				{roomTypes: ["mineSmall"], tag: "hoodie_entrance", "branch": 1}
            }
        ],
        "normal_encounters"://51704
		[
            {weight:3, roomName: "Mine_Small_Normal_MineCart"},//49909
            {weight:3, roomName: "Mine_Small_Normal_Pillar"},//50441
            {weight:3, roomName: "Mine_Small_Normal_PillarHole"},//49991
            {weight:3, roomName: "Mine_Small_Normal_PillarSpinner"},//49095
            {weight:3, roomName: "Mine_Small_Normal_RockWall"},//51819
            {weight:3, roomName: "Mine_Small_Normal_SouthNorthHole"},//51887
            {weight:3, roomName: "Mine_Small_Normal_StationarySpinners"},//49756
            {weight:3, roomName: "Mine_Small_Normal_BrokenCarts"},//47713
            {weight:3, roomName: "Mine_Small_Normal_StatueSpinner"},//48498
            {weight:2, roomName: "Mine_Small_Normal_Bridge"},//50390
            {weight:3, roomName: "Mine_Small_Normal_EWSpinners"},//50719
            {weight:3, roomName: "Mine_Small_Normal_CornerHoles"},//45658
            {weight:3, roomName: "Mine_Small_Normal_DualPillar"},//50425
            {weight:3, roomName: "Mine_Small_Normal_Spikes"},//46409
            {weight:3, roomName: "Mine_Small_Normal_SpikePatch"},//52267
            {weight:3, roomName: "Mine_Small_Normal_PillarSpawner"},//52917
            {weight:1, roomName: "Mine_Small_Normal_SetPiece"},//45735
            {weight:2, roomName: "Mine_Small_Normal_HoleEW"},//45819
            {weight:2, roomName: "Mine_Small_Normal_HoleEWSpinner"},//45474
            {weight:4, roomName: "Mine_Small_Normal_Plain"},//47401
            {weight:2, roomName: "Mine_Small_Normal_HazardHeavy"},//51308
            {weight:2, roomName: "Mine_Small_Normal_DangerWalls"},//52317
            {weight:3, roomName: "Mine_Small_Normal_TilePattern"},//52333
            {weight:3, roomName: "Mine_Small_Normal_CornerRocks"},//46821
            {weight:2, roomName: "Mine_Small_Normal_RockPath"},//47578
            {weight:3, roomName: "Mine_Small_Normal_DiagonalHole"},//49578
            {weight:3, roomName: "Mine_Small_Normal_CenterTorches"},//51238
            {weight:2, roomName: "Mine_Small_Normal_Ruins"},//49389
            {weight:3, roomName: "Mine_Small_Normal_Statues"},//46899
            {weight:3, roomName: "Mine_Small_Normal_LargeSpinnerTrack"}//52226
        ],
        "end_encounters"://50064
		[
            {weight:1, roomName: "Mine_Small_End_Normal", roomTag: "end"},//46718
			{weight:1, roomName: "Mine_Small_End_Worm", roomTag: "end_worm"},//49126
			{weight:1, roomName: "Mine_Small_End_Tutorial", roomTag: "end_tutorial"},//47735
			{weight:1, roomName: "Mine_Small_End_Boss", roomTag: "end_boss"}//45842
        ],
        "relic_encounters_unlocked"://46470
		[
            {weight:4, roomName: "Mine_Small_Relic_Locked_Pots", requirement:"noRelicHex"},//45031
			{weight:4, roomName: "Mine_Small_Relic_Locked_Torches", requirement:"noRelicHex"},//50620
			{weight:4, roomName: "Mine_Small_Relic_Locked_Hole", requirement:"noRelicHex"},//48407
			{weight:1, roomName: "Mine_Small_Relic_Locked_TorchPuzzle", requirement:"noRelicHex"},//50350
			{weight:4, roomName: "Mine_Small_Relic_Locked_Statues", requirement:"noRelicHex"}//50092
        ],
        "relic_encounters"://51785
		[
            {weight:4, roomName: "Mine_Small_Relic_Locked_Pots", requirement:"noRelicHex"},//48458
			{weight:4, roomName: "Mine_Small_Relic_Locked_Torches", requirement:"noRelicHex"},//45800
			{weight:4, roomName: "Mine_Small_Relic_Locked_Hole", requirement:"noRelicHex"},//48827
			{weight:1, roomName: "Mine_Small_Relic_Locked_TorchPuzzle", requirement:"noRelicHex"},//51612
			{weight:4, roomName: "Mine_Small_Relic_Locked_Statues", requirement:"noRelicHex"}//51997
        ],
        "special_encounters"://46818
		[
            {weight:1, roomName: "Mine_Small_Special_DodsonCage", requirement:"dodsonNotRescued"},//45181
            {weight:1, roomName: "Mine_Small_Special_WaylandShop", requirement:"waylandNotRescued"},//50180
            {weight:1, roomName: "Mine_Small_Special_WaylandShopHallway", requirement:"waylandNotRescued", roomTag: "waylandshophallway"},//47928
            {weight:1, roomName: "Mine_Small_Special_MushroomFamily", requirement:"noGreenShroom", roomTag: "mushroom"},//45129
            {weight:1, roomName: "Mine_Small_Special_MushroomFarm", requirement:"noBlueShroom", roomTag: "mushroom"},//47532
            {weight:1, roomName: "Mine_Small_Special_BlackRabbit", requirement:"blackRabbitNotMet", roomTag: "black_rabbit_first"},//45409
            {weight:1, roomName: "Mine_Small_Special_Hoodie_Locked", requirement:"hoodieNotMet", roomTag: "hoodie_entrance"},//48900
            {weight:1, roomName: "Mine_Small_Special_Hoodie_Unlocked", requirement:"hoodieMet", roomTag: "hoodie_entrance"},//46864
            {weight:1, roomName: "Mine_Small_Special_TributeFountain", requirement:"thisRunFountainNotFound", roomTag: "tribute_fountain"}//48707
        ],
        "secret"://45085
		[
            {weight:4, roomName: "Mine_Small_Secret_WaterChest", sequence://47448
            	{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:4, roomName: "Mine_Small_Secret_Carts", sequence://51587
            	{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:1, roomName: "Mine_Small_Secret_Altar", sequence://51761
            	{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_CursedTorch", sequence://46662
				{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_Crystals", sequence://49012
            	{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:4, roomName: "Mine_Small_Secret_Chest", sequence://45847
            	{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_SpikeSacrifice", sequence://46575
            	{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:1, roomName: "Mine_Small_Secret_Blessing", sequence://47495
            	{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_Items", sequence://49928
            	{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_Chest", sequence://46401
            	{"type": ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_ChestCommon", sequence://46634
            	{"type": ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_KeyBlock", sequence://50112
            	{"type": ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_Bombs", sequence://46616
            	{"type": ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  "skip": true}
            },
            {weight:10, roomName: "Mine_Small_Secret_DogShadow", requirement: "dogShadowNotFound", sequence://46497
            	{"type": ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  "skip": true}
            },
            {weight:2, roomName: "Mine_Small_Secret_LeverBlocks", sequence://45540
            	{"type": ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  "skip": true}
            },
            {weight:1, roomName: "Mine_Small_Secret_Tent", sequence://50488
            	{"type": ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  "skip": true}
            },
            {weight:2, roomName: "Mine_Small_Secret_Nugg", sequence://53023
            	{"type": ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_Bard", requirement: "thisRunBardNotMet", sequence://48615
				{"type": ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  "skip": true}
            },
            {weight:3, roomName: "Mine_Small_Secret_TributeFountain", requirement:"bogUnlocked", sequence://48501
                {"type": ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  "skip": true}
            }
        ],
        "hidden"://46542
		[
            {weight:3, roomName: "Mine_Small_Hidden_WaterChest"},//45785
			{weight:3, roomName: "Mine_Small_Hidden_Carts"},//45297
			{weight:1, roomName: "Mine_Small_Hidden_TreasureHunt", requirement: "noTreasureNote"},//50018
			{weight:1, roomName: "Mine_Small_Hidden_Altar"},//51599
			{weight:2, roomName: "Mine_Small_Hidden_CursedTorch"},//45564
			{weight:2, roomName: "Mine_Small_Hidden_CursedRelic"},//45202
			{weight:3, roomName: "Mine_Small_Hidden_Crystals"},//49368
			{weight:1, roomName: "Mine_Small_Hidden_Lab"},//49180
			{weight:3, roomName: "Mine_Small_Hidden_Chest"},//49106
			{weight:3, roomName: "Mine_Small_Hidden_SpikeSacrifice"},//47523
			{weight:1, roomName: "Mine_Small_Hidden_Blessing"},//46689
			{weight:1, roomName: "Mine_Small_Hidden_Blessing02"},//51892
			{weight:1, roomName: "Mine_Small_Hidden_ButchersRoom"},//50084
			{weight:1, roomName: "Mine_Small_Hidden_RatFriendship", requirement: "noRatBond"},//52611
			{weight:3, roomName: "Mine_Small_Hidden_Chest"},//50729
			{weight:2, roomName: "Mine_Small_Hidden_Bard", requirement: "thisRunBardNotMet"}//52652
        ],
        "treasure_encounters"://49906
		[
            {weight:3, roomName: "Mine_Small_Treasure_Skeleton"},//51639
            {weight:3, roomName: "Mine_Small_Treasure_Rocks"},//51113
            {weight:3, roomName: "Mine_Small_Treasure_Spikes"},//46068
            {weight:2, roomName: "Mine_Small_Treasure_HoleBridges"},//52234
            {weight:3, roomName: "Mine_Small_Treasure_LockedRocks"},//50936
            {weight:2, roomName: "Mine_Small_Treasure_StatuePuzzle"},//52537
            {weight:3, roomName: "Mine_Small_Treasure_LockedBlocks"},//51138
            {weight:1, roomName: "Mine_Small_Treasure_CursedRelics"},//52942
            {weight:3, roomName: "Mine_Small_Treasure_SpikeCage"},//50588
            {weight:3, roomName: "Mine_Small_Treasure_RockCage"},//48912
            {weight:1, roomName: "Mine_Small_Treasure_SpikeSacrifice"},//51837
            {weight:2, roomName: "Mine_Small_Treasure_DiagonalRocks"},//47676
            {weight:2, roomName: "Mine_Small_Treasure_HealthLever"},//52384
            {weight:2, roomName: "Mine_Small_Treasure_Pillar"}//45655
        ],
        "treasure_basic_encounters"://49882
        [
            {weight:1, roomName: "Mine_Small_Treasure_Basic_Skeleton"},//49827
            {weight:1, roomName: "Mine_Small_Treasure_Basic_Rocks"},//51355
            {weight:1, roomName: "Mine_Small_Treasure_Basic_Plain"},//51894
        ],
        "altar"://51277
		[
            {weight:2, roomName: "Mine_Small_Altar_Torches", requirement:"priestessMet", sequence://45728
				{"type": ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Statues", requirement:"priestessMet", sequence://48658
				{"type": ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Bridges", requirement:"priestessMet", sequence://50011
                {"type": ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Tiled", requirement:"priestessMet", sequence://47799
                {"type": ["mineSmall"], tag: "altar_guacamole", branch: 1}
            }
        ],
        "altar_locked"://47098
		[
            {weight:2, roomName: "Mine_Small_Altar_Torches", requirement:"priestessMet", sequence://45736
				{"type": ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Statues", requirement:"priestessMet", sequence://46779
				{"type": ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Bridges", requirement:"priestessMet", sequence://46186
                {"type": ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Tiled", requirement:"priestessMet", sequence://52373
                {"type": ["mineSmall"], tag: "altar_guacamole", branch: 1}
            }
        ],
        "altar_guacamole"://46070
		[
            {weight:2, roomName: "Mine_Small_Altar_Torches", requirement: "guacamole"},//50904
            {weight:2, roomName: "Mine_Small_Altar_Statues", requirement: "guacamole"},//49918
            {weight:2, roomName: "Mine_Small_Altar_Bridges", requirement: "guacamole"},//47061
            {weight:2, roomName: "Mine_Small_Altar_Tiled", requirement: "guacamole"}//45131
        ],
        "easiest_encounters"://50202
        [
            {weight:1, roomName: "Mine_Small_Easy_Spinner"},//47740
            {weight:1, roomName: "Mine_Small_Easy_Spikes"},//48305
            {weight:3, roomName: "Mine_Small_Easy_Pillar"},//48626
            {weight:1, roomName: "Mine_Small_Easy_Plain"}//50053            
        ],
        "tutorial"://45284
        [
            {weight:1, roomName: "Mine_Small_Tutorial_Jump", roomTag:"tutorial_jump"},//48068
            {weight:1, roomName: "Mine_Small_Tutorial_Attack", roomTag:"tutorial_attack"},//50086
            {weight:1, roomName: "Mine_Small_Tutorial_Bomb", roomTag:"tutorial_bomb"},//48852
            {weight:1, roomName: "Mine_Small_Tutorial_Relic", roomTag:"tutorial_relic"},//52632
            {weight:1, roomName: "Mine_Small_Tutorial_Begin", roomTag:"begin_tutorial"},//50679
            {weight:1, roomName: "Mine_Small_Tutorial_Secret", roomTag:"tutorial_secret"}//51526
        ],
        "direct":
        [
            {weight:1, roomName: "Mine_Small_End_Normal", roomTag: "end"},//46718
			{weight:1, roomName: "Mine_Small_End_Worm", roomTag: "end_worm"},//49126
			{weight:1, roomName: "Mine_Small_End_Tutorial", roomTag: "end_tutorial"},//47735
			{weight:1, roomName: "Mine_Small_End_Boss", roomTag: "end_boss"},//45842
            {weight:1, roomName: "Mine_Small_Special_DodsonCage", roomTag: "DodsonCageEncounter", requirement:"dodsonNotRescued"},//45181
            {weight:1, roomName: "Mine_Small_Special_WaylandShop", roomTag: "waylandshop", requirement:"waylandNotRescued",},//50180
            {weight:1, roomName: "Mine_Small_Special_WaylandShopHallway",roomTag: "waylandshophallway", requirement:"waylandNotRescued"},//47928
            {weight:1, roomName: "Mine_Small_Special_MushroomFamily", roomTag: "mushroom", requirement:"noGreenShroom"},//45129
            {weight:1, roomName: "Mine_Small_Special_MushroomFarm", roomTag: "mushroom", requirement:"noBlueShroom"},//47532
            {weight:1, roomName: "Mine_Small_Special_BlackRabbit", roomTag: "black_rabbit_first", requirement:"blackRabbitNotMet"},//45409
            {weight:1, roomName: "Mine_Small_Special_Hoodie_Locked", roomTag: "hoodie_entrance", requirement:"hoodieNotMet"},//48900
            {weight:1, roomName: "Mine_Small_Special_Hoodie_Unlocked", roomTag: "hoodie_entrance", requirement:"hoodieMet"},//46864
            {weight:1, roomName: "Mine_Small_Special_TributeFountain", roomTag: "tribute_fountain", requirement:"thisRunFountainNotFound"},//48707
            {weight:1, roomName: "Mine_Small_Tutorial_Jump", roomTag:"tutorial_jump"},//48068
            {weight:1, roomName: "Mine_Small_Tutorial_Attack", roomTag:"tutorial_attack"},//50086
            {weight:1, roomName: "Mine_Small_Tutorial_Bomb", roomTag:"tutorial_bomb"},//48852
            {weight:1, roomName: "Mine_Small_Tutorial_Relic", roomTag:"tutorial_relic"},//52632
            {weight:1, roomName: "Mine_Small_Tutorial_Begin", roomTag:"begin_tutorial"},//50679
            {weight:1, roomName: "Mine_Small_Tutorial_Secret", roomTag:"tutorial_secret"}//51526
        ]
    },
    "mineLarge": {
        "normal_encounters"://46587
		[
            {weight:2, roomName: "Mine_Large_Normal_RailStatues"},//51734
            {weight:2, roomName: "Mine_Large_Normal_LargeRail"},//49349
            {weight:2, roomName: "Mine_Large_Normal_HoleBridge"},//48832
            {weight:2, roomName: "Mine_Large_Normal_RailSnake"},//50599
            {weight:2, roomName: "Mine_Large_Normal_Staging"},//47273
            {weight:2, roomName: "Mine_Large_Normal_PillarRocks"},//47751
            {weight:2, roomName: "Mine_Large_Normal_SpikeDonut"},//50039
            {weight:3, roomName: "Mine_Large_Normal_RailBrideLoop"},//51687
            {weight:3, roomName: "Mine_Large_Normal_RailBridge"},//47967
            {weight:1, roomName: "Mine_Large_Normal_OilBarrels"},//49654
            {weight:2, roomName: "Mine_Large_Normal_MineField"},//48733
            {weight:2, roomName: "Mine_Large_Normal_Bridges"},//48038
            {weight:2, roomName: "Mine_Large_Normal_Spikes"},//46029
            {weight:3, roomName: "Mine_Large_Normal_CornerNE"},//51596
            {weight:1, roomName: "Mine_Large_Normal_LandBridgeNS"},//50088
            {weight:2, roomName: "Mine_Large_Normal_DualPillars"},//48082
            {weight:2, roomName: "Mine_Large_Normal_SpikeBridge"},//51452
            {weight:3, roomName: "Mine_Large_Normal_CornerSW"},//48936
            {weight:2, roomName: "Mine_Large_Normal_RockCross"},//51971
            {weight:2, roomName: "Mine_Large_Normal_SlotHoles"},//51305
            {weight:2, roomName: "Mine_Large_Normal_RockColumns"},//49316
            {weight:3, roomName: "Mine_Large_Normal_ATrack"},//51222
            {weight:3, roomName: "Mine_Large_Normal_DynamicHole"},//51281
            {weight:2, roomName: "Mine_Large_Normal_TeeRocks"},//49432
            {weight:3, roomName: "Mine_Large_Normal_HoleArrows"},//47516
            {weight:1, roomName: "Mine_Large_Normal_DualSetPiece"},//47479
            {weight:3, roomName: "Mine_Large_Normal_Arena"},//49696
            {weight:2, roomName: "Mine_Large_Normal_ArenaTrack"},//50317
            {weight:2, roomName: "Mine_Large_Normal_QuadPillars"},//48009
            {weight:2, roomName: "Mine_Large_Normal_RockArrowMaze"},//45401
            {weight:2, roomName: "Mine_Large_Normal_RailGuantlet"},//49080
            {weight:2, roomName: "Mine_Large_Normal_HazardHeavy"},//50819
            {weight:2, roomName: "Mine_Large_Normal_ArrowGuantlet"},//45112
            {weight:2, roomName: "Mine_Large_Normal_DonutSpinner"},//52413
            {weight:2, roomName: "Mine_Large_Normal_CornerRocks"},//49924
            {weight:2, roomName: "Mine_Large_Normal_TeeJunction"},//48217
            {weight:3, roomName: "Mine_Large_Normal_CornerBridge"},//50504
            {weight:3, roomName: "Mine_Large_Normal_BridgeHole"},//52503
            {weight:3, roomName: "Mine_Large_Normal_BigRocks"},//51678
            {weight:3, roomName: "Mine_Large_Normal_TriangleRocks"},//50798
            {weight:2, roomName: "Mine_Large_Normal_SnakeBridge"},//47895
            {weight:3, roomName: "Mine_Large_Normal_RandomBlocks"},//51860
            {weight:3, roomName: "Mine_Large_Normal_Empty"},//48128
            {weight:4, roomName: "Mine_Large_Normal_TwoSetPiece"},//48138
            {weight:3, roomName: "Mine_Large_Normal_Grassy"},//50559
            {weight:2, roomName: "Mine_Large_Normal_FivePillars"},//52967
            {weight:1, roomName: "Mine_Large_Normal_SnakeTrack"},//52405
            {weight:3, roomName: "Mine_Large_Normal_Torches"},//51740
            {weight:2, roomName: "Mine_Large_Normal_RailIslands"},//52027
            {weight:1, roomName: "Mine_Large_Normal_MushroomGrowOp"}//47982
        ],
        "special_encounters"://48631
        [
            {weight:5, roomName: "Mine_Large_Special_RockMimic", roomTag:"RockMimicEncounter", requirement:"noDodsonKey"},//49967
            {weight:5, roomName: "Mine_Large_Special_MushroomDarkness", roomTag: "mushroom", requirement:"noPurpleShroom"},//52130
            {weight:5, roomName: "Mine_Large_Special_AlchemistApprentice0", roomTag:"mushroom_apprentice", requirement: "apprenticeNotMet"},//45519
            {weight:5, roomName: "Mine_Large_Special_AlchemistApprentice3", roomTag:"mushroom_apprentice", requirement: "haveAllShrooms"},//47191
            {weight:5, roomName: "Mine_Large_Special_RelicAltar", roomTag:"relic_altar", requrement: "thisRunAltarNotFound"}//51857
        ],
        "secret"://51980
		[
            {weight:5, roomName: "Mine_Large_Secret_GrassChests"},//52629
			{weight:1, roomName: "Mine_Large_Secret_Altar"},//46957
			{weight:5, roomName: "Mine_Large_Secret_Blessing"},//49475
			{weight:5, roomName: "Mine_Large_Secret_BasicItems"},//48084
			{weight:5, roomName: "Mine_Large_Secret_Gold"},//52676
			{weight:3, roomName: "Mine_Large_Secret_BlackRabbitShop", requirement:"blackRabbitMet"},//51362
			{weight:5, roomName: "Mine_Large_Secret_Potion"},//48736
			{weight:5, roomName: "Mine_Large_Secret_Chest"},//48431
			{weight:3, roomName: "Mine_Large_Secret_CursedTorch"},//51146
			{weight:1, roomName: "Mine_Large_Secret_DangerousToGo", requirement:"devleCount8+"},//50072
			{weight:5, roomName: "Mine_Large_Secret_SpikedFood"},//46384
			{weight:3, roomName: "Mine_Large_Secret_DoubleLockBlock"},//52336
			{weight:4, roomName: "Mine_Large_Secret_StatueBombPuzzle"},//50401
			{weight:1, roomName: "Mine_Large_Secret_Pillars"},//52007
			{weight:1, roomName: "Mine_Large_Secret_OilyBridge"}//50959
        ],
        "hidden"://45511
        [
            {weight:2, roomName: "Mine_Large_Hidden_LeverBlocks"},//48755
			{weight:2, roomName: "Mine_Large_Hidden_GrassChests"},//52761
			{weight:2, roomName: "Mine_Large_Hidden_TorchPuzzle"},//51360
			{weight:2, roomName: "Mine_Large_Hidden_Keys"},//47958
			{weight:2, roomName: "Mine_Large_Hidden_Potions"},//50067
			{weight:1, roomName: "Mine_Large_Hidden_Blessing"},//51985
			{weight:1, roomName: "Mine_Large_Hidden_Blessing02"},//52737
			{weight:1, roomName: "Mine_Large_Hidden_CursedRelics"},//51942
			{weight:1, roomName: "Mine_Large_Hidden_Altar"},//50337
			{weight:2, roomName: "Mine_Large_Hidden_PressureTrap"},//46151
			{weight:2, roomName: "Mine_Large_Hidden_ChooseBlessing"},//49643
			{weight:2, roomName: "Mine_Large_Hidden_BobosLair"},//51313
			{weight:2, roomName: "Mine_Large_Hidden_CaveIn"},//51959
			{weight:1, roomName: "Mine_Large_Hidden_Gap"}//51202
        ],
        "treasure_encounters"://49071
        [
            {weight:3, roomName: "Mine_Large_Treasure_ItemBlocks"},//46731
            {weight:3, roomName: "Mine_Large_Treasure_SpikedChest"},//48902
            {weight:3, roomName: "Mine_Large_Treasure_HoleSpikeChest"},//47942
            {weight:3, roomName: "Mine_Large_Treasure_TorchPuzzle"},//47619
            {weight:3, roomName: "Mine_Large_Treasure_SpikeRails"},//48104
            {weight:3, roomName: "Mine_Large_Treasure_BridgePuzzle"},//45159
            {weight:3, roomName: "Mine_Large_Treasure_BombPuzzle"},//52025
            {weight:4, roomName: "Mine_Large_Treasure_JustSomeTreasure"},//51865
            {weight:2, roomName: "Mine_Large_Treasure_LeverBridge"},//46038
            {weight:3, roomName: "Mine_Large_Treasure_VerticalBridge"},//48326
            {weight:4, roomName: "Mine_Large_Treasure_Decision"},//49405
            {weight:3, roomName: "Mine_Large_Treasure_HealthLever"},//52472
            {weight:5, roomName: "Mine_Large_Treasure_SecretShop", requirement:"dibbleNotComplete"},//49970
            {weight:2, roomName: "Mine_Large_Treasure_OilChest"},//45893
            {weight:2, roomName: "Mine_Large_Treasure_FireyChest"},//46302
            {weight:2, roomName: "Mine_Large_Treasure_ElectrifiedChest"},//45324
            {weight:4, roomName: "Mine_Large_Treasure_JustSomeTreasure02"},//45312
            {weight:2, roomName: "Mine_Large_Treasure_Nexus"},//45981
            {weight:1, roomName: "Mine_Large_Treasure_TwoBombsOneKey"},//46674
            {weight:2, roomName: "Mine_Large_Treasure_SpikeSacrifice"},//48433
            {weight:2, roomName: "Mine_Large_Treasure_Choice"},//50675
            {weight:2, roomName: "Mine_Large_Treasure_DoubleRail"},//48698
            {weight:1, roomName: "Mine_Large_Treasure_RockLock"}//52486
        ],
        "tutorial"://50221
        [
            {weight:1, roomName: "Mine_Large_Tutorial_Throw", roomTag:"tutorial_throw"},//45817
            {weight:1, roomName: "Mine_Large_Tutorial_Pilfer", roomTag:"tutorial_pilfer"}//48606
        ],
        "challange"://50721
        [
            {weight:1, roomName: "Mine_Large_Challenge_GamblingRoom"},//51338
            {weight:1, roomName: "Mine_Large_Challenge_Combat"}//49339
        ]
    },
    "SleepyHoodyRoom": {
        "hoody":
		[
            {weight:1, roomName: "SleepyHoodyRoom", requirement:false, roomTag: "hoodie_entrance"}//
        ]
    },
    "direct":
	[
        {weight:1, roomName: "Mine_Small_Special_DodsonCage", requirement:"peasant1_unlocked == 0", roomTag: "DodsonCageEncounter"},//
        {weight:1, roomName: "Mine_Small_Special_WaylandShop", requirement:"blacksmith_rescued == 0", roomTag: "waylandshop"},//
        {weight:1, roomName: "Mine_Small_Special_WaylandShopHallway", requirement:"blacksmith_rescued == 0", roomTag: "waylandshophallway"},//
        {weight:1, roomName: "Mine_Small_Special_MushroomFamily", requirement:"mushroom_green == 0, apprentice_met > 0", roomTag: "mushroom"},//
        {weight:1, roomName: "Mine_Small_Special_MushroomFarm", requirement:"mushroom_blue == 0, apprentice_met > 0", roomTag: "mushroom"},//
        {weight:1, roomName: "Mine_Small_Special_BlackRabbit", requirement:true, roomTag: "black_rabbit_first"},//
        {weight:1, roomName: "Mine_Small_Special_Hoodie_Locked", requirement:false, roomTag: "hoodie_entrance"},//
        {weight:1, roomName: "Mine_Small_Special_Hoodie_Unlocked", requirement:false, roomTag: "hoodie_entrance"},//
        {weight:1, roomName: "Mine_Small_Special_TributeFountain", requirement:false, roomTag: "tribute_fountain"},//
        {weight:1, roomName: "Mine_Small_End_Normal", roomTag: "end"},//
		{weight:1, roomName: "Mine_Small_End_Worm", requirement:"end_worm", roomTag: "end_worm"},//
		{weight:1, roomName: "Mine_Small_End_Tutorial", roomTag: "end_tutorial"},//
		{weight:1, roomName: "Mine_Small_End_Boss", roomTag: "end_boss"}//
    ]

});