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

let settings:any = {
	checkboxes: {
		relic: [],
		potion: []
	},
	altarRelic: {
		value:0
	},
	flags: {}
}

const seedRand = new Random(Date.now());