function loadSave(radio:HTMLInputElement, file?:string) {

	//make settings base
	const settingsOut = {
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
			"dibble_relic": 0,
			"relicHex": 0,
			"dog_shadow_found": 0,
			"delve_count": 0,
			"bard_met": 0,
			"secret_treasure_note": 0,
			"foundRatBond": 0,
			"priestess_met": 0,
			"haveGuacamole": 0,
			"peasant1_unlocked": 0,
			"blacksmith_rescued": 0,
			"foundWaylandsBoots": 0,
			"mushroom_green": 0,
			"mushroom_blue": 0,
			"mushroom_purple": 0,
			"apprentice_met": 0,
			"black_rabbit_met": 0,
			"rockmimic_defeated": 0,
			"hoodie_met": 0,
			"hoodie_met_mine": 0,
			"tribute_fountain_encountered": 0,
			"peasant2_unlocked": 0,
			"dibble_upgrade_count": 0,
			"prisoner_key": 0,
			"altar_encountered": 0,
			"haveWhip": 0,
			"haveHat": 0,
			"haveCircinus": 0,
			"bog_unlocked": 0			
		}
	}

	//list all collections of check-boxes
	const CBRelic: HTMLInputElement[] = Object.values(e$("relic-selection").getElementsByTagName("input"));
	const CBPotion: HTMLInputElement[] = Object.values(e$("potion-selection").getElementsByTagName("input"));

	//main selection
	switch(radio.value) {
		case "0":// new save, do nothing
			break;

		case '100':// full save
			settingsOut.checkboxes.relic = CBRelic;
			settingsOut.checkboxes.potion = CBPotion;
			settingsOut.altarRelic = 149;
			settingsOut.flags['shop_basic_item'] = 2;
			settingsOut.flags['shop_food'] = 3;
			settingsOut.flags['shop_potion_relic'] = 3;
			settingsOut.flags['dibble_extra_item'] = 1;
			settingsOut.flags['dibble_relic'] = 1;
			settingsOut.flags['relicHex'] = 0;
			settingsOut.flags['dog_shadow_found'] = 1;
			settingsOut.flags['delve_count'] = 100;
			settingsOut.flags['bard_met'] = 0;
			settingsOut.flags['secret_treasure_note'] = 0;
			settingsOut.flags['foundRatBond'] = 1;
			settingsOut.flags['priestess_met'] = 3;
			settingsOut.flags['haveGuacamole'] = 0;
			settingsOut.flags['peasant1_unlocked'] = 1;
			settingsOut.flags['blacksmith_rescued'] = 1;
			settingsOut.flags['foundWaylandsBoots'] = 1;
			settingsOut.flags['mushroom_green'] = 1;
			settingsOut.flags['mushroom_blue'] = 1;
			settingsOut.flags['mushroom_purple'] = 1;
			settingsOut.flags['apprentice_met'] = 7;
			settingsOut.flags['black_rabbit_met'] = 1;
			settingsOut.flags['rockmimic_defeated'] = 1;
			settingsOut.flags['hoodie_met'] = 1;
			settingsOut.flags['hoodie_met_mine'] = 1;
			settingsOut.flags['tribute_fountain_encountered'] = 0;
			settingsOut.flags['peasant2_unlocked'] = 1;
			settingsOut.flags['dibble_upgrade_count'] = 4;
			settingsOut.flags['prisoner_key'] = 1;
			settingsOut.flags['altar_encountered'] = 0;
			settingsOut.flags['haveWhip'] = 0;
			settingsOut.flags['haveCircinus'] = 0;
			settingsOut.flags['haveHat'] = 0;
			settingsOut.flags['bog_unlocked'] = 1;			
			break;
		case 'own': // loaded save, parse data
			const saveData = JSON.parse(file);
		
			settingsOut.checkboxes.relic = saveData.unlocked.flatMap( craftedGUID => 
				CBRelic.find( box => parseInt(box.value) === masterTable.relic.findIndex( relic => relic.guid === craftedGUID)) ?? []
			);

			settingsOut.checkboxes.potion = saveData.unlocked.flatMap( craftedGUID => 
				CBPotion.find( box => parseInt(box.value) === masterTable.potion.findIndex( potion => potion.guid === craftedGUID)) ?? []
			);

            settingsOut.altarRelic = masterTable.relic.findIndex( relic => relic.guid === saveData.altarItemID);
            
            saveData.upgradeString.split(',').forEach( item => {
                const [key, value] = item.split(':');
                settingsOut.flags[key] = parseInt(value);
            });		
			
			break;
		
	}

	return settingsOut; // return mutated settingsOut
}