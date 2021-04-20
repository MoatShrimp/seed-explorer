
//load Dibbles stock
function dibble(seed) {
	const wTables = [], items = [];
	const totalItems = 2 + settings.flags.dibble_extra_item;

	// make list of items
	if (settings.flags.dibble_relic) {
		wTables.push(rand.shop.getWeightedTable(lootTables.dibbleRelic));
	}
	for (let i = settings.flags.dibble_relic; i < totalItems; ++i) {
		wTables.push(rand.shop.getWeightedTable(lootTables.dibble));
	}
	
	wTables.forEach( (subtable) => {		
		const table = masterTable.weightedTables[subtable.masterIndex];
		const index = rand[table.randState].loot(lootTables[table.key]);
		items.push({display:masterTable[table.type][index].display, type:table.type})
		if (table.type === "relic"){
			toggleWeight(index, "relic");
		}
	})
	
	//create html base
	const field = e$c("fieldset", {id:"hub", classList:"zone"})
	const legend = e$c("legend", {textContent: "Hub"});
	field.appendChild(legend);
	e$("levels").appendChild(field);

	const subfield = e$c("fieldset", {id:"dibble", classList:"level"})
	const sublegend = e$c("legend", {textContent:"Dibble"});
	subfield.appendChild(sublegend);
	e$("hub").appendChild(subfield);

	//apend each item to the list
	items.forEach((item, i) => {
		e$("dibble").appendChild(e$c("div", {classList:`icon-${item.type}`, innerText:item.display}));
	});
}
