//load shop items, using global variable [settings]
function shop(zone, level) {

	//variabels
    const shopName = `shop-${zone}-${level}`;
	const totalPoR = settings.flags.shop_potion_relic;
	const totalFood = settings.flags.shop_food;
	const totalBasic = settings.flags.shop_basic_item;
	const totalItems = totalPoR + totalFood + totalBasic;
	const wTable = [], table = [], index = [], item = [], html = [];

	//create container for the shop results
	let shopRoom = document.createElement("div");
	shopRoom.id = shopName;
	shopRoom.classList.add("icon-shop");
	e$(zone + level).appendChild(shopRoom);

	

	//add relics or potions
	for (let i = 0; i < totalPoR; ++i) {

		//randomly pick the relic loot table or poiton loot table
		wTable.push(rand.shop.getWeightedTable(lootTables.potionOrRelic));
		table.push(masterTable.weightedTables[wTable[i].masterIndex]);
		index.push(rand[table[i].randState].loot(lootTables[table[i].key]));

		//zero the relic before loading next
		if (table[i].type === "relic") {
			toggleWeight(index[i]);
		}
	}

	//load all food
	for (let i = 0; i < totalFood; ++i) {
		table.push({ "key": "food", "type": "food", "randState": "shopHealth" });
	}

	//load all basic items such as bombs and keys
	for (let i = 0; i < totalBasic; ++i) {
		table.push({ "key": "item", "type": "item", "randState": "shopBasicItem" });
	}

	//get index for each found item, skip relics since they have already been added
	for (let i = totalPoR; i < totalItems; ++i) {
		index.push(rand[table[i].randState].loot(lootTables[table[i].key]));
	}

	//get all items from masterTable
	index.forEach((index, i) => {
		item.push(masterTable[table[i].type][index]);
		
	});

	//add each item to the shop containter
	table.forEach((table, i) => {
		html.push(document.createElement("div"));
		html[i].classList.add(`icon-${table.type}`);
		html[i].innerHTML = item[i].display;
		e$(shopName).appendChild(html[i]);
	});


}
