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
			"dibble_relic": 0
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
var no1, no2;