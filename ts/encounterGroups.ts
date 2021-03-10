interface encounterGroups {
    [zone: string]: {
        [encounterGroup: string]:[
            {weight:number, roomName: string, roomTag?:string, doorType?:string, requirement?: string, sequence?: 
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
            {weight:4, roomName: "Mine_Small_Relic_Locked_Pots", doorType:"locked", requirement:"noRelicHex"},//48458
			{weight:4, roomName: "Mine_Small_Relic_Locked_Torches", doorType:"locked", requirement:"noRelicHex"},//45800
			{weight:4, roomName: "Mine_Small_Relic_Locked_Hole", doorType:"locked", requirement:"noRelicHex"},//48827
			{weight:1, roomName: "Mine_Small_Relic_Locked_TorchPuzzle", doorType:"locked", requirement:"noRelicHex"},//51612
			{weight:4, roomName: "Mine_Small_Relic_Locked_Statues", doorType:"locked", requirement:"noRelicHex"}//51997
        ],
        "secret"://45085
		[
            {weight:4, roomName: "Mine_Small_Secret_WaterChest", doorType:"secret", sequence://47448
            	{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:4, roomName: "Mine_Small_Secret_Carts", doorType:"secret", sequence://51587
            	{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:1, roomName: "Mine_Small_Secret_Altar", doorType:"secret", sequence://51761
            	{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_CursedTorch", doorType:"secret", sequence://46662
				{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_Crystals", doorType:"secret", sequence://49012
            	{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:4, roomName: "Mine_Small_Secret_Chest", doorType:"secret", sequence://45847
            	{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_SpikeSacrifice", doorType:"secret", sequence://46575
            	{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:1, roomName: "Mine_Small_Secret_Blessing", doorType:"secret", sequence://47495
            	{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_Items", doorType:"secret", sequence://49928
            	{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_Chest", doorType:"secret", sequence://46401
            	{roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_ChestCommon", doorType:"secret", sequence://46634
            	{roomTypes: ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_KeyBlock", doorType:"secret", sequence://50112
            	{roomTypes: ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_Bombs", doorType:"secret", sequence://46616
            	{roomTypes: ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  requirement:"circinus"}
            },
            {weight:10, roomName: "Mine_Small_Secret_DogShadow", doorType:"secret", requirement: "dogShadowNotFound", sequence://46497
            	{roomTypes: ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  requirement:"circinus"}
            },
            {weight:2, roomName: "Mine_Small_Secret_LeverBlocks", doorType:"secret", sequence://45540
            	{roomTypes: ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  requirement:"circinus"}
            },
            {weight:1, roomName: "Mine_Small_Secret_Tent", doorType:"secret", sequence://50488
            	{roomTypes: ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  requirement:"circinus"}
            },
            {weight:2, roomName: "Mine_Small_Secret_Nugg", doorType:"secret", sequence://53023
            	{roomTypes: ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_Bard", doorType:"secret", requirement: "thisRunBardNotMet", sequence://48615
				{roomTypes: ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  requirement:"circinus"}
            },
            {weight:3, roomName: "Mine_Small_Secret_TributeFountain", doorType:"secret", requirement:"bogUnlocked", sequence://48501
                {roomTypes: ["mineSmall", "mineLarge"],tag: "secret", chance: 0.25,  requirement:"circinus"}
            }
        ],
        "hidden"://46542
		[
            {weight:3, roomName: "Mine_Small_Hidden_WaterChest", doorType:"hidden"},//45785
			{weight:3, roomName: "Mine_Small_Hidden_Carts", doorType:"hidden"},//45297
			{weight:1, roomName: "Mine_Small_Hidden_TreasureHunt", doorType:"hidden", requirement: "noTreasureNote"},//50018
			{weight:1, roomName: "Mine_Small_Hidden_Altar", doorType:"hidden"},//51599
			{weight:2, roomName: "Mine_Small_Hidden_CursedTorch", doorType:"hidden"},//45564
			{weight:2, roomName: "Mine_Small_Hidden_CursedRelic", doorType:"hidden"},//45202
			{weight:3, roomName: "Mine_Small_Hidden_Crystals", doorType:"hidden"},//49368
			{weight:1, roomName: "Mine_Small_Hidden_Lab", doorType:"hidden"},//49180
			{weight:3, roomName: "Mine_Small_Hidden_Chest", doorType:"hidden"},//49106
			{weight:3, roomName: "Mine_Small_Hidden_SpikeSacrifice", doorType:"hidden"},//47523
			{weight:1, roomName: "Mine_Small_Hidden_Blessing", doorType:"hidden"},//46689
			{weight:1, roomName: "Mine_Small_Hidden_Blessing02", doorType:"hidden"},//51892
			{weight:1, roomName: "Mine_Small_Hidden_ButchersRoom", doorType:"hidden"},//50084
			{weight:1, roomName: "Mine_Small_Hidden_RatFriendship", doorType:"hidden", requirement: "noRatBond"},//52611
			{weight:3, roomName: "Mine_Small_Hidden_Chest", doorType:"hidden"},//50729
			{weight:2, roomName: "Mine_Small_Hidden_Bard", doorType:"hidden", requirement: "thisRunBardNotMet"}//52652
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
            {weight:1, roomName: "Mine_Small_Treasure_CursedRelics", doorType:"locked"},//52942
            {weight:3, roomName: "Mine_Small_Treasure_SpikeCage"},//50588
            {weight:3, roomName: "Mine_Small_Treasure_RockCage"},//48912
            {weight:1, roomName: "Mine_Small_Treasure_SpikeSacrifice"},//51837
            {weight:2, roomName: "Mine_Small_Treasure_DiagonalRocks"},//47676
            {weight:2, roomName: "Mine_Small_Treasure_HealthLever"},//52384
            {weight:2, roomName: "Mine_Small_Treasure_Pillar"}//45655
        ],
        "altar"://51277
		[
            {weight:2, roomName: "Mine_Small_Altar_Torches", requirement:"priestessMet",//45728
                weightedDoorTypes: [
                    {weight:1, doorType:"open"},
                    {weight:1, doorType:"locked"}
                ],
                sequence:
				{roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Statues", requirement:"priestessMet",//48658
                weightedDoorTypes: [
                    {weight:1, doorType:"open"},
                    {weight:1, doorType:"locked"}
                ],
                sequence:
				{roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Bridges", requirement:"priestessMet",//50011
                weightedDoorTypes: [
                    {weight:1, doorType:"open"},
                    {weight:1, doorType:"locked"}
                ],
                sequence:
                {roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Tiled", requirement:"priestessMet",//47799
                weightedDoorTypes: [
                    {weight:1, doorType:"open"},
                    {weight:1, doorType:"locked"}
                ],
                sequence:
                {roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1}
            }
        ],
        "altar_locked"://47098
		[
            {weight:2, roomName: "Mine_Small_Altar_Torches", doorType:"locked", requirement:"priestessMet", sequence://45736
				{roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Statues", doorType:"locked", requirement:"priestessMet", sequence://46779
				{roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Bridges", doorType:"locked", requirement:"priestessMet", sequence://46186
                {roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1}
            },
            {weight:2, roomName: "Mine_Small_Altar_Tiled", doorType:"locked", requirement:"priestessMet", sequence://52373
                {roomTypes: ["mineSmall"], tag: "altar_guacamole", branch: 1}
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
        "treasure_basic_encounters"://49882
        [
            {weight:1, roomName: "Mine_Small_Treasure_Basic_Skeleton"},//49827
            {weight:1, roomName: "Mine_Small_Treasure_Basic_Rocks"},//51355
            {weight:1, roomName: "Mine_Small_Treasure_Basic_Plain"},//51894
        ],
        "direct":
        [
            //end_encounters - 50064
            {weight:1, roomName: "Mine_Small_End_Normal", roomTag: "end"},//46718
			{weight:1, roomName: "Mine_Small_End_Worm", roomTag: "end_worm"},//49126
			{weight:1, roomName: "Mine_Small_End_Tutorial", roomTag: "end_tutorial"},//47735
			{weight:1, roomName: "Mine_Small_End_Boss", roomTag: "end_boss"},//45842
            //special_encounters - 46818
            {weight:1, roomName: "Mine_Small_Special_DodsonCage", roomTag: "DodsonCageEncounter", requirement:"dodsonNotRescued"},//45181
            {weight:1, roomName: "Mine_Small_Special_WaylandShop", roomTag: "waylandshop", requirement:"waylandNotRescued",},//50180
            {weight:1, roomName: "Mine_Small_Special_WaylandShopHallway",roomTag: "waylandshophallway", doorType:"rock", requirement:"waylandNotRescued"},//47928
            {weight:1, roomName: "Mine_Small_Special_MushroomFamily", roomTag: "mushroom", doorType:"rock", requirement:"noGreenShroom"},//45129
            {weight:1, roomName: "Mine_Small_Special_MushroomFarm", roomTag: "mushroom", requirement:"noBlueShroom"},//47532
            {weight:1, roomName: "Mine_Small_Special_BlackRabbit", roomTag: "black_rabbit_first", requirement:"blackRabbitNotMet"},//45409
            {weight:1, roomName: "Mine_Small_Special_Hoodie_Locked", roomTag: "hoodie_entrance", doorType:"crystal", requirement:"hoodieNotMet"},//48900
            {weight:1, roomName: "Mine_Small_Special_Hoodie_Unlocked", roomTag: "hoodie_entrance", requirement:"hoodieMet"},//46864
            {weight:1, roomName: "Mine_Small_Special_TributeFountain", roomTag: "tribute_fountain", requirement:"thisRunFountainNotFound"},//48707
            //tutorial - 45284
            {weight:1, roomName: "Mine_Small_Tutorial_Jump", roomTag:"tutorial_jump"},//48068
            {weight:1, roomName: "Mine_Small_Tutorial_Attack", roomTag:"tutorial_attack"},//50086
            {weight:1, roomName: "Mine_Small_Tutorial_Bomb", roomTag:"tutorial_bomb"},//48852
            {weight:1, roomName: "Mine_Small_Tutorial_Relic", roomTag:"tutorial_relic"},//52632
            {weight:1, roomName: "Mine_Small_Tutorial_Begin", roomTag:"begin_tutorial"},//50679
            {weight:1, roomName: "Mine_Small_Tutorial_Secret", roomTag:"tutorial_secret", doorType:"secret"}//51526
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
        "secret"://51980
		[
            {weight:5, roomName: "Mine_Large_Secret_GrassChests", doorType:"secret", sequence://52629
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:1, roomName: "Mine_Large_Secret_Altar", doorType:"secret", sequence://46957
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:5, roomName: "Mine_Large_Secret_Blessing", doorType:"secret", sequence://49475
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:5, roomName: "Mine_Large_Secret_BasicItems", doorType:"secret", sequence://48084
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:5, roomName: "Mine_Large_Secret_Gold", doorType:"secret", sequence://52676
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:3, roomName: "Mine_Large_Secret_BlackRabbitShop", doorType:"secret", requirement:"blackRabbitMet", sequence://51362
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:5, roomName: "Mine_Large_Secret_Potion", doorType:"secret", sequence://48736
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:5, roomName: "Mine_Large_Secret_Chest", doorType:"secret", sequence://48431
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:3, roomName: "Mine_Large_Secret_CursedTorch", doorType:"secret", sequence://51146
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:1, roomName: "Mine_Large_Secret_DangerousToGo", doorType:"secret", requirement:"devleCount8+", sequence://50072
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:5, roomName: "Mine_Large_Secret_SpikedFood", doorType:"secret", sequence://46384
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:3, roomName: "Mine_Large_Secret_DoubleLockBlock", doorType:"secret", sequence://52336
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:4, roomName: "Mine_Large_Secret_StatueBombPuzzle", doorType:"secret", sequence://50401
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:1, roomName: "Mine_Large_Secret_Pillars", doorType:"secret", sequence://52007
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            },
			{weight:1, roomName: "Mine_Large_Secret_OilyBridge", doorType:"secret", sequence://50959
                {roomTypes: ["mineSmall", "mineLarge"], tag: "secret", chance: 0.25, requirement:"circinus"}
            }
        ],
        "hidden"://45511
        [
            {weight:2, roomName: "Mine_Large_Hidden_LeverBlocks", doorType:"hidden"},//48755
			{weight:2, roomName: "Mine_Large_Hidden_GrassChests", doorType:"hidden"},//52761
			{weight:2, roomName: "Mine_Large_Hidden_TorchPuzzle", doorType:"hidden"},//51360
			{weight:2, roomName: "Mine_Large_Hidden_Keys", doorType:"hidden"},//47958
			{weight:2, roomName: "Mine_Large_Hidden_Potions", doorType:"hidden"},//50067
			{weight:1, roomName: "Mine_Large_Hidden_Blessing", doorType:"hidden"},//51985
			{weight:1, roomName: "Mine_Large_Hidden_Blessing02", doorType:"hidden"},//52737
			{weight:1, roomName: "Mine_Large_Hidden_CursedRelics", doorType:"hidden"},//51942
			{weight:1, roomName: "Mine_Large_Hidden_Altar", doorType:"hidden"},//50337
			{weight:2, roomName: "Mine_Large_Hidden_PressureTrap", doorType:"hidden"},//46151
			{weight:2, roomName: "Mine_Large_Hidden_ChooseBlessing", doorType:"hidden"},//49643
			{weight:2, roomName: "Mine_Large_Hidden_BobosLair", doorType:"hidden"},//51313
			{weight:2, roomName: "Mine_Large_Hidden_CaveIn", doorType:"hidden"},//51959
			{weight:1, roomName: "Mine_Large_Hidden_Gap", doorType:"hidden"}//51202
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
            {weight:5, roomName: "Mine_Large_Treasure_SecretShop", doorType:"crystal", requirement:"dibbleNotComplete"},//49970
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
        "challange"://50721
        [
            {weight:1, roomName: "Mine_Large_Challenge_GamblingRoom"},//51338
            {weight:1, roomName: "Mine_Large_Challenge_Combat"}//49339
        ],
        "shop": //3101 (EncounterShop)
        [
            {weight:1, roomName: "Encounter_Shop", roomTag:"shop",//3101 (EncounterShop)
                weightedDoorTypes: [
                    {weight:10, doorType:"open"},
                    {weight:7, doorType:"locked"}
                ],
            }
        ],
        "direct":
        [
            //special_encounters - 48631
            {weight:5, roomName: "Mine_Large_Special_RockMimic", roomTag:"RockMimicEncounter", requirement:"noDodsonKey"},//49967
            {weight:5, roomName: "Mine_Large_Special_MushroomDarkness", roomTag: "mushroom", doorType:"rock", requirement:"noPurpleShroom"},//52130
            {weight:5, roomName: "Mine_Large_Special_AlchemistApprentice0", roomTag:"mushroom_apprentice", requirement: "apprenticeNotMet"},//45519
            {weight:5, roomName: "Mine_Large_Special_AlchemistApprentice3", roomTag:"mushroom_apprentice", requirement: "haveAllShrooms"},//47191
            {weight:5, roomName: "Mine_Large_Special_RelicAltar", roomTag:"relic_altar", requrement: "thisRunAltarNotFound"},//51857
            //tutorial - 50221
            {weight:1, roomName: "Mine_Large_Tutorial_Throw", doorType:"locked", roomTag:"tutorial_throw"},//45817
            {weight:1, roomName: "Mine_Large_Tutorial_Pilfer", roomTag:"tutorial_pilfer"},//48606
            //black_rabbit// Encounter_BR_TreasureGame
            {weight:1, roomName: "Encounter_BR_TreasureGame", roomTag:"black_rabbit"}//219
            //shop
            /*{weight:1, roomName: "Encounter_Shop", roomTag:"shop",//3101 (EncounterShop)
                weightedDoorTypes: [
                    {weight:10, doorType:"open"},
                    {weight:7, doorType:"locked"}
                ],
            }*/
        ]
    },
    "SleepyHoodyRoom": {
        "hoody":
		[
            {weight:1, roomName: "SleepyHoodyRoom", roomTag: "hoodie_entrance"}//
        ]
    }
});