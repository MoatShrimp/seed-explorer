// 12475489, Shows Key and Bomb
function shop(zone, level) {

    const shopName = `shop-${zone}-${level}`;

	let shopRoom = document.createElement("div");
	shopRoom.id = shopName;
	shopRoom.classList.add("icon-shop");
	e$('#' + zone + level).appendChild(shopRoom);

	let table = [], index = [], item = [], html = [], wTable = [];

	for (let i = 0; i < 3; ++i) {

		wTable.push(rand.shop.getWeightedTable(lootTables.potionOrRelic));
		table.push(masterTable.weightedTables[wTable[i].masterIndex]);
		index.push(rand[table[i].randState].loot(lootTables[table[i].key]));

		if (table[i].type == "relic") {
			toggleWeight(index[i]);

		}
	}


	table.push({ "key": "food", "type": "food", "randState": "shopHealth" });
	table.push({ "key": "food", "type": "food", "randState": "shopHealth" });
	table.push({ "key": "food", "type": "food", "randState": "shopHealth" });
	table.push({ "key": "item", "type": "item", "randState": "shopBasicItem" });
	table.push({ "key": "item", "type": "item", "randState": "shopBasicItem" });

	for (let i = 3; i < 8; ++i) {

		index.push(rand[table[i].randState].loot(lootTables[table[i].key]));

	}


	index.forEach((index, i) => {
		item.push(masterTable[table[i].type][index]);
	});
	table.forEach((table, i) => {
		html.push(document.createElement("div"));
		html[i].classList.add(`icon-${table.type}`);
		html[i].innerHTML = item[i].display;
		e$(`#${shopName}`).appendChild(html[i]);
	});


}
