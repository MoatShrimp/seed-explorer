interface position {
	x: number,
	y: number
}

interface room {
	roomTypes: string[],
	roomName?: string,
	tag: string,
	weight?: number,
	chance?: number,
	requirement?: string,
	direction?: number,
	position?: position,
	previousRoom?: room,
	neighbours?: room[],
	prohibitedExits?: number,
	branches?: [number, room][],
	doorType?: string;
};

interface mapList {
	[zoneName: string]: room[][][];
};


const maps:mapList = {
	mineTutorial ://tutorial floor for new save
	[
		[//floor 1
			[
				{roomTypes:["mineSmall"], tag:"begin_tutorial", weight:1, direction:0},
				{roomTypes:["mineSmall"], tag:"tutorial_jump", weight:1, direction:2},
				{roomTypes:["mineSmall"], tag:"tutorial_attack", weight:1, direction:2},
				{roomTypes:["mineSmall"], tag:"tutorial_bomb", weight:1, direction:4},
				{roomTypes:["mineLarge"], tag:"tutorial_throw", weight:1, direction:1},
				{roomTypes:["mineLarge"], tag:"tutorial_pilfer", weight:1, direction:4},
				{roomTypes:["mineSmall"], tag:"tutorial_relic", weight:1, direction:1},
				{roomTypes:["mineSmall"], tag:"end_tutorial", weight:1, direction:1}
			]
		]
	],
	mineEarly ://mines before Rock Mimic has been defeated
	[
		[//floor 1
			[
				{roomTypes:["mineSmall"], tag:"begin", weight:1},
				{roomTypes:["mineSmall"], tag:"easiest_encounters", weight:4},
				{roomTypes:["mineSmall"], tag:"easiest_encounters", weight:4},
				{roomTypes:["mineSmall"], tag:"easiest_encounters", weight:4},
				{roomTypes:["mineSmall"], tag:"end", weight:1}
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters_unlocked", weight:1}],
			[	{roomTypes:["mineSmall"], tag:"treasure_basic_encounters", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_basic_encounters", chance:0.5, requirement:"whip"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", chance:0.5, requirement:"hat"}],
			[	{roomTypes:["SleepyHoodyRoom"], tag:""}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", chance:0.0625}]
		],
		[//floor 2
			[
				{roomTypes:["mineSmall"], tag:"begin", weight:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall"], tag:"end", weight:1}
			],
			[
				{roomTypes:["mineSmall"], tag:"waylandshophallway"},
				{roomTypes:["mineSmall"], tag:"waylandshop", direction:1}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineSmall"], tag:"altar"}],
			[	{roomTypes:["mineSmall"], tag:"treasure_basic_encounters", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_basic_encounters", chance:0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", chance:0.5, requirement:"hat"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", chance:0.125}]
		],
		[//floor 3
			[
				{roomTypes:["mineSmall"], tag:"begin", weight:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
			],
			[
				{roomTypes:["mineSmall"], tag:"DodsonCageEncounter,normal_encounters", weight:4},
				{roomTypes:["mineLarge"], tag:"RockMimicEncounter,normal_encounters"},	
				{roomTypes:["mineSmall"], tag:"end", weight:1}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", chance:0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", chance:0.5, requirement:"hat"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", chance:0.1875}]
		],
		[//floor 4
			[{roomTypes:["mineSmall"], tag:"begin", weight:1}],
			[
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall"], tag:"end_worm"}
			],
			[
				{roomTypes:["Mine_Dungeon_Room_Large"], tag:"", weight:1},
				{roomTypes:["dungeonSmall"], tag:"dungeon_entrance"}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineSmall"], tag:"altar"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", chance:0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", chance:0.5, requirement:"hat"}],
			[	{roomTypes:["SandRoom"], tag:"hidden"}],
			[	{roomTypes:["dungeonSmall", "dungeonLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", chance:0.25}]
		],
	],
	mine ://mines after Rock Mimic has been defeated
	[
		[//floor 1
			[
				{roomTypes:["mineSmall"], tag:"begin", weight:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall"], tag:"end", weight:1}
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters_unlocked", weight:1}],
			[	{roomTypes:["mineSmall"], tag:"black_rabbit_first",  weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", chance:0.5, requirement:"whip"}],
			[	{roomTypes:["mineSmall"], tag:"altar", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", chance:0.5, requirement:"hat"}],
			[	{roomTypes:["SleepyHoodyRoom"], tag:"hoody"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", chance:0.0625}],
			[	{roomTypes:["mineSmall"], tag:"tribute_fountain", chance:0.0625}]
		],
		[//floor 2
			[
				{roomTypes:["mineSmall"], tag:"begin", weight:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall"], tag:"end", weight:1}
			],
			[
				{roomTypes:["mineSmall"], tag:"waylandshophallway"},
				{roomTypes:["mineSmall"], tag:"waylandshop"}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineLarge"], tag:"mushroom_apprentice", weight:1, chance:0.5}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"mushroom", weight:1, chance:0.6}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", chance:0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", chance:0.5, requirement:"hat"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", chance:0.125}],
			[	{roomTypes:["mineSmall"], tag:"tribute_fountain", chance:0.125}]
		],
		[//floor 3
			[
				{roomTypes:["mineSmall"], tag:"begin", weight:1},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", weight:4},
			],
			[
				{roomTypes:["mineSmall"], tag:"DodsonCageEncounter,normal_encounters", weight:4},
				{roomTypes:["mineLarge"], tag:"RockMimicEncounter,normal_encounters"},
				{roomTypes:["mineSmall"], tag:"end", weight:1}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineLarge"], tag:"mushroom_apprentice", weight:1, chance:0.7}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"mushroom", weight:1, chance:0.7}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", chance:0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", weight:1}],
			[	{roomTypes:["mineSmall"], tag:"altar", weight:1}],
			[	{roomTypes:["mineLarge"], tag:"black_rabbit", chance:0.5}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", chance:0.5, requirement:"hat"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", chance:0.1875}],
			[	{roomTypes:["mineSmall"], tag:"tribute_fountain", chance:0.1875}]
		],
		[//floor 4
			[	{roomTypes:["mineSmall"], tag:"begin", weight:1}],
			[
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall", "mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineLarge"], tag:"normal_encounters", weight:4},
				{roomTypes:["mineSmall"], tag:"end_worm"}
			],
			[
				{roomTypes:["Mine_Dungeon_Room_Large"], tag:"", weight:1},
				{roomTypes:["dungeonSmall"], tag:"dungeon_entrance"}	
			],
			[	{roomTypes:["mineSmall"], tag:"relic_encounters"}],
			[	{roomTypes:["mineLarge"], tag:"mushroom_apprentice", weight:1, chance:0.9}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"mushroom", weight:1, chance:0.8}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"treasure_encounters", chance:0.5, requirement:"whip"}],
			[	{roomTypes:["mineLarge"], tag:"shop", weight:1}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret"}],
			[	{roomTypes:["mineSmall", "mineLarge"], tag:"secret", chance:0.5, requirement:"hat"}],
			[	{roomTypes:["SandRoom"], tag:"hidden"}],
			[	{roomTypes:["dungeonSmall", "dungeonLarge"], tag:"hidden"}],
			[	{roomTypes:["mineLarge"], tag:"relic_altar", chance:0.25}],
			[	{roomTypes:["mineSmall"], tag:"tribute_fountain", chance:0.25}]
		]
	]
};