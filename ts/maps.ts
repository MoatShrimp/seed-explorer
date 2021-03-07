interface maps {
	[zoneName: string]:
	[//array of floors
		[//array of roomGroups
			[//array of rooms
				{roomTypes:string[], tag:string, branch?:number, chance?:number, requirement?:string, direction?:number}
			]
		]
	]
}

const maps = {
	mineTutorial ://tutorial floor for new save
	[
		[//floor 1
			[
				{roomTypes:["mineSmall"], tag:"begin_tutorial", branch:1, direction:0},
				{roomTypes:["mineSmall"], tag:"tutorial_jump", branch:1, direction:2},
				{roomTypes:["mineSmall"], tag:"tutorial_attack", branch:1, direction:2},
				{roomTypes:["mineSmall"], tag:"tutorial_bomb", branch:1, direction:4},
				{roomTypes:["mineLarge"], tag:"tutorial_throw", branch:1, direction:1},
				{roomTypes:["mineLarge"], tag:"tutorial_pilfer", branch:1, direction:4},
				{roomTypes:["mineSmall"], tag:"tutorial_relic", branch:1, direction:1},
				{roomTypes:["mineSmall"], tag:"end_tutorial", branch:1, direction:1}
			]
		]
	],
	mineEarly ://mines before Rock Mimic has been defeated
	[
		[//floor 1
			[
				{roomTypes:["mineSmall"], tag:"begin", branch:1},
				{roomTypes:["mineSmall"], tag:"easiest_encounters", branch:4},
				{roomTypes:["mineSmall"], tag:"easiest_encounters", branch:4},
				{roomTypes:["mineSmall"], tag:"easiest_encounters", branch:4},
				{roomTypes:["mineSmall"], tag:"end", branch:1}
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters_unlocked", branch:1}],
			[	{roomTypes:["mineSmall"], tag:"treasure_basic_encounters", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_basic_encounters", "chance":0.5, requirement:"whip"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", "chance":0.5, requirement:"hat"}],
			[	{roomTypes:["SleepyHoodyRoom"], tag:""}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", "chance":0.0625}]
		],
		[//floor 2
			[
				{roomTypes:["mineSmall"], tag:"begin", branch:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall"], tag:"end", branch:1}
			],
			[
				{roomTypes:["mineSmall"], tag:"waylandshophallway"},
				{roomTypes:["mineSmall"], tag:"waylandshop"}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineSmall"], tag:"altar"}],
			[	{roomTypes:["mineSmall"], tag:"treasure_basic_encounters", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_basic_encounters", "chance":0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", "chance":0.5, requirement:"hat"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", "chance":0.125}]
		],
		[//floor 3
			[
				{roomTypes:["mineSmall"], tag:"begin", branch:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
			],
			[
				{roomTypes:["mineSmall"], tag:"DodsonCageEncounter,normal_encounters", branch:4},
				{roomTypes:["mineLarge"], tag:"RockMimicEncounter,normal_encounters"},	
				{roomTypes:["mineSmall"], tag:"end", branch:1}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", "chance":0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", "chance":0.5, requirement:"hat"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", "chance":0.1875}]
		],
		[//floor 4
			[{roomTypes:["mineSmall"], tag:"begin", branch:1}],
			[
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall"], tag:"end_worm"}
			],
			[
				{roomTypes:["Mine_Dungeon_Room_Large"], tag:"", branch:1},
				{roomTypes:["dungeonSmall"], tag:"dungeon_entrance"}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineSmall"], tag:"altar"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", "chance":0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", "chance":0.5, requirement:"hat"}],
			[	{roomTypes:["SandRoom"], tag:"hidden"}],
			[	{roomTypes:["dungeonSmall", "dungeonLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", "chance":0.25}]
		],
	],
	mine ://mines after Rock Mimic has been defeated
	[
		[//floor 1
			[
				{roomTypes:["mineSmall"], tag:"begin", branch:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall"], tag:"end", branch:1}
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters_unlocked", branch:1}],
			[	{roomTypes:["mineSmall"], tag:"black_rabbit_first", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", "chance":0.5, requirement:"whip"}],
			[	{roomTypes:["mineSmall"], tag:"altar", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", "chance":0.5, requirement:"hat"}],
			[	{roomTypes:["SleepyHoodyRoom"], tag:"hoody"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", "chance":0.0625}],
			[	{roomTypes:["mineLarge"], tag:"tribute_fountain", "chance":0.0625}]
		],
		[//floor 2
			[
				{roomTypes:["mineSmall"], tag:"begin", branch:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall"], tag:"end", branch:1}
			],
			[
				{roomTypes:["mineSmall"], tag:"waylandshophallway"},
				{roomTypes:["mineSmall"], tag:"waylandshop"}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineLarge"], tag:"mushroom_apprentice", branch:1, "chance":0.5}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"mushroom", branch:1, "chance":0.6}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", "chance":0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", "chance":0.5, requirement:"hat"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", "chance":0.125}],
			[	{roomTypes:["mineLarge"], tag:"tribute_fountain", "chance":0.125}]
		],
		[//floor 3
			[
				{roomTypes:["mineSmall"], tag:"begin", branch:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", branch:4},
			],
			[
				{roomTypes:["mineSmall"], tag:"DodsonCageEncounter,normal_encounters", branch:4},
				{roomTypes:["mineLarge"], tag:"RockMimicEncounter,normal_encounters"},
				{roomTypes:["mineSmall"], tag:"end", branch:1}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineLarge"], tag:"mushroom_apprentice", branch:1, "chance":0.7}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"mushroom", branch:1, "chance":0.7}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", "chance":0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", branch:1}],
			[	{roomTypes:["mineSmall"], tag:"altar", branch:1}],
			[	{roomTypes:["mineLarge"], tag:"black_rabbit", "chance":0.5}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", "chance":0.5, requirement:"hat"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", "chance":0.1875}],
			[	{roomTypes:["mineLarge"], tag:"tribute_fountain", "chance":0.1875}]
		],
		[//floor 4
			[	{roomTypes:["mineSmall"], tag:"begin", branch:1}],
			[
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", branch:4},
				{roomTypes:["mineSmall"], tag:"end_worm"}
			],
			[
				{roomTypes:["Mine_Dungeon_Room_Large"], tag:"", branch:1},
				{roomTypes:["dungeonSmall"], tag:"dungeon_entrance"}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineLarge"], tag:"mushroom_apprentice", branch:1, "chance":0.9}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"mushroom", branch:1, "chance":0.8}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", "chance":0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", branch:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", "chance":0.5, requirement:"hat"}],
			[	{roomTypes:["SandRoom"], tag:"hidden"}],
			[	{roomTypes:["dungeonSmall", "dungeonLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", "chance":0.25}],
			[	{roomTypes:["mineLarge"], tag:"tribute_fountain", "chance":0.25}]
		]
	]
};