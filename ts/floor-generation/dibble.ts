//remove items from unchecked check-boxes from the lootTable
/*function toggleMissing () {
	const unckeckedBoxes = Object.values(settings.checkboxes.relic).filter((box) => !box.checked);
	const unckeckedPotions = Object.values(settings.checkboxes.potion).filter((box) => !box.checked);
	const missing = unckeckedBoxes.map((box) => box.value);
	const missingPotions = unckeckedPotions.map((box) => box.value);
	toggleWeight(missing);
	toggleWeight(missingPotions, 'potion');

}*/
//load Dibbles stock
function dibble(seed) {

	let table = [], index = [], item = [], html = [], wTable = [];
	let field = document.createElement("fieldset");
	field.id = 'hub';
	field.classList.add('zone');
	let legend = document.createElement("legend");
	legend.textContent = 'Hub';
	field.appendChild(legend);
	e$('#levels').appendChild(field);

	let subfield = document.createElement("fieldset");
	subfield.id = 'dibble';
	subfield.classList.add('level');
	let sublegend = document.createElement("legend");
	sublegend.textContent = 'Dibble';
	subfield.appendChild(sublegend);
	e$('#hub').appendChild(subfield);

	wTable.push(rand.shop.getWeightedTable(lootTables.dibbleRelic));
	wTable.push(rand.shop.getWeightedTable(lootTables.dibble));
	wTable.push(rand.shop.getWeightedTable(lootTables.dibble));

	wTable.forEach((wTable) => {
		table.push(masterTable.weightedTables[wTable.masterIndex]);
	});

	table.forEach((table) => {
		index.push(rand[table.randState].loot(lootTables[table.key]));
	});

	index.forEach((index, i) => {
		item.push(masterTable[table[i].type][index]);
	});

	if (table[0].type == 'relic') {
		toggleWeight(index[0]);
	}

	table.forEach((table, i) => {
		html.push(document.createElement("div"));
		html[i].classList.add('icon-' + table.type);
		html[i].innerHTML = item[i].display;
		e$('#dibble').appendChild(html[i]);
	});
}
