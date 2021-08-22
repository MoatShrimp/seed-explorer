function loadSave(radio:HTMLInputElement, file?:string) {

	//make settings base
	const settingsOut = {
		checkboxes: {
			relic: null,
			potion: null
		},
		altarRelic: -1,
		flags: {
			altar_encountered: 0,
			apprentice_met: 0,
			bard_met: 0,
			black_rabbit_met: 0,
			blacksmith_rescued: 0,
			bog_unlocked: 0,
			bog_visited: 0,
			collector_book: 0,
			crystallord_defeated: 0,
			debt: 0,
			delve_count: 0,
			dibble_discount: 0,
			dibble_extra_item: 0,
			dibble_relic: 0,
			dibble_upgrade_count: 0,
			dog_dillon_found: 0,
			dog_engine_found: 0,
			dog_shadow_found: 0,
			firelord_defeated: 0,
			floor_number: 0,
			guacamole: 0,			
			hoodie_met: 0,
			hoodie_met_cavern: 0,
			hoodie_met_dungeon: 0,
			hoodie_met_hall: 0,
			hoodie_met_mine: 0,
			masters_key: 0,
			mushroom_blue: 0,
			mushroom_green: 0,
			mushroom_purple: 0,
			peasant1_unlocked: 0,
			peasant2_unlocked: 0,
			peasant4_unlocked: 0,
			priestess_met: 0,
			prisoner_key: 0,
			rockmimic_defeated: 0,
			sandworm_defeated: 0,
			secret_treasure_note: 0,
			shadowlord_defeated: 0,
			shop_basic_item: 1,
			shop_food: 1,
			shop_item_count: 0,
			shop_potion_relic: 1,
			stonelord_defeated: 0,
			tribute_fountain_encountered: 0,			
			tutorial_complete: 0,
			whip_enabled: 0,
			//custom flags
			storyMode: 0,
			rougeMode: 0,
			hexDesolation: 0,
			discoveredRatBond: 0,
			discoveredWaylandBoots: 0,
			discoveredHungrySpirit: 0,
			relicWhip: 0,
			relicHat: 0,
			relicCircinus: 0,	
		}
	}

	//list all collections of check-boxes
	const CBRelic: HTMLInputElement[] = Object.values(e$("relic-selection").getElementsByTagName("input"));
	const CBPotion: HTMLInputElement[] = Object.values(e$("potion-selection").getElementsByTagName("input"));

	//main selection
	switch(radio.value) {
		case "0":// new save, do nothing
			break;

		case "100":// full save
			settingsOut.checkboxes.relic = CBRelic;
			settingsOut.checkboxes.potion = CBPotion;
			settingsOut.altarRelic = 149;
			settingsOut.flags.apprentice_met = 7;
			settingsOut.flags.black_rabbit_met = 1;
			settingsOut.flags.blacksmith_rescued = 3;
			settingsOut.flags.bog_unlocked = 1;
			settingsOut.flags.bog_visited = 1;
			settingsOut.flags.collector_book = 3;
			settingsOut.flags.crystallord_defeated = 1;
			settingsOut.flags.debt = 0;
			settingsOut.flags.delve_count = 99;
			settingsOut.flags.dibble_discount = 2;
			settingsOut.flags.dibble_extra_item = 1;
			settingsOut.flags.dibble_relic = 1;
			settingsOut.flags.dibble_upgrade_count = 4;
			settingsOut.flags.dog_dillon_found = 1;
			settingsOut.flags.dog_engine_found = 1;
			settingsOut.flags.dog_shadow_found = 1;
			settingsOut.flags.firelord_defeated = 1;
			settingsOut.flags.floor_number = 0;
			settingsOut.flags.hoodie_met = 1;
			settingsOut.flags.hoodie_met_cavern = 1;
			settingsOut.flags.hoodie_met_dungeon = 1;
			settingsOut.flags.hoodie_met_hall = 1;
			settingsOut.flags.hoodie_met_mine = 1;
			settingsOut.flags.masters_key = 1;
			settingsOut.flags.mushroom_blue = 1;
			settingsOut.flags.mushroom_green = 1;
			settingsOut.flags.mushroom_purple = 1;
			settingsOut.flags.peasant1_unlocked = 1;
			settingsOut.flags.peasant2_unlocked = 1;
			settingsOut.flags.peasant4_unlocked = 1;
			settingsOut.flags.priestess_met = 3;
			settingsOut.flags.prisoner_key = 1;
			settingsOut.flags.rockmimic_defeated = 1;
			settingsOut.flags.sandworm_defeated = 1;
			settingsOut.flags.secret_treasure_note = 0;
			settingsOut.flags.shadowlord_defeated = 1;
			settingsOut.flags.shop_basic_item = 2;
			settingsOut.flags.shop_food = 3;
			settingsOut.flags.shop_item_count = 8;
			settingsOut.flags.stonelord_defeated = 1;
			settingsOut.flags.tutorial_complete = 1;
			settingsOut.flags.storyMode = 1;
			settingsOut.flags.rougeMode = 0;
			settingsOut.flags.hexDesolation = 0;
			settingsOut.flags.discoveredRatBond = 1;
			settingsOut.flags.discoveredWaylandBoots = 1;
			settingsOut.flags.discoveredHungrySpirit = 1;
			settingsOut.flags.relicWhip = 0;
			settingsOut.flags.relicHat = 0;
			settingsOut.flags.relicCircinus = 0;
			break;
			
		case "own": // loaded save, parse data
			const saveData = JSON.parse(file);
		
			settingsOut.checkboxes.relic = saveData.unlocked.flatMap( craftedGUID => 
				CBRelic.find( box => parseInt(box.value) === masterTable.relic.findIndex( relic => relic.guid === craftedGUID)) ?? []
			);

			settingsOut.checkboxes.potion = saveData.unlocked.flatMap( craftedGUID => 
				CBPotion.find( box => parseInt(box.value) === masterTable.potion.findIndex( potion => potion.guid === craftedGUID)) ?? []
			);

            settingsOut.altarRelic = masterTable.relic.findIndex( relic => relic.guid === saveData.altarItemID);
            
            saveData.upgradeString.split(",").forEach( item => {
                const [key, value] = item.split(":");
                settingsOut.flags[key] = parseInt(value);
            });		
			
			break;
		
	}

	return settingsOut; // return mutated settingsOut
}