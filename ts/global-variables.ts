const lootTables = {
	relic: [],
	relicAll: [],
	relicShop: [],
	relicFinal: [],
	relicStarter: [],
	relicLegendary: [],
	potion: [],
	potionShop: [],
	potionDibble: [],
	potionFinal: [],
	food: [],
	item: [],
	itemShop: [],
	itemDibble: [],
	dibble: [],
	dibbleRelic: [],
	potionOrRelic: []
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
	altarRelic: -1,
	flags: {
		shop_basic_item: 1,
		shop_food: 1,
		shop_potion_relic: 1,
		dibble_extra_item: 0,
		dibble_relic: 0,
		relicHex: 0,
		dog_shadow_found: 0,
		delve_count: 0,
		bard_met: 0,
		secret_treasure_note: 0,
		foundRatBond: 0,
		priestess_met: 0,
		haveGuacamole: 0,
		peasant1_unlocked: 0,
		blacksmith_rescued: 0,
		foundWaylandsBoots: 0,
		mushroom_green: 0,
		mushroom_blue: 0,
		mushroom_purple: 0,
		apprentice_met: 0,
		black_rabbit_met: 0,
		rockmimic_defeated: 0,
		hoodie_met: 0,
		hoodie_met_mine: 0,
		tribute_fountain_encountered: 0,
		peasant2_unlocked: 0,
		dibble_upgrade_count: 0,
		prisoner_key: 0,
		altar_encountered: 0,
		haveWhip: 0,
		haveHat: 0,
		haveCircinus: 0,
		bog_unlocked: 0
	}
}

//const seedRand = new Random(Date.now());
const seedRand = new Random(Date.now());