const lootTables = {
	"relic": [],
	"relicAll": [],
	"relicShop": [],
	"relicFinal": [],
	"relicStarter": [],
	"relicLegendary": [],
	"potion": [],
	"potionShop": [],
	"potionDibble": [],
	"potionFinal": [],
	"food": [],
	"item": [],
	"itemShop": [],
	"itemDibble": [],
	"dibble": [],
	"dibbleRelic": [],
	"potionOrRelic": []
};

const rand = {
	default: null,
	layout: null,
	relic: null,
	blessing: null,
	blueprint: null,
	basicItem: null,
	potion: null,
	health: null,
	resource: null,
	shopRelic: null,
	shopPotion: null,
	shopHealth: null,
	shopBasicItem: null,
	Legendary: null,
	dibble: null,
	misc: null,
	shop: null,
	majorCurse: null,
	minorCurse: null,
	familiar: null,
	upgrade: null,
	chaos: null,
	table: null
};

let settings = {
	checkboxes: {
		relic: null,
		potion: null
	},
	"altarRelic": -1,
	flags: {
		"shop_basic_item": 1,
		"shop_food": 1,
		"shop_potion_relic": 1,
		"dibble_extra_item": 0,
		"dibble_relic": 0
	}
}

const seedRand = new Random(Date.now());