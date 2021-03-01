
//load Dibbles stock
function dibble(seed) {

	let tables = [], index = [], item = [], html = [], wTables = [];
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

	wTables.push(rand.shop.getWeightedTable(lootTables.dibbleRelic));
	wTables.push(rand.shop.getWeightedTable(lootTables.dibble));
	wTables.push(rand.shop.getWeightedTable(lootTables.dibble));

	wTables.forEach((wTable) => {
		tables.push(masterTable.weightedTables[wTable.masterIndex]);
	});

	tables.forEach((table) => {
		index.push(rand[table.randState].loot(lootTables[table.key]));
	});

	index.forEach((index, i) => {
		item.push(masterTable[tables[i].type][index]);
	});

	if (tables[0].type == 'relic') {
		toggleWeight(index[0]);
	}

	tables.forEach((table, i) => {
		html.push(document.createElement("div"));
		html[i].classList.add('icon-' + table.type);
		html[i].innerHTML = item[i].display;
		e$('#dibble').appendChild(html[i]);
	});
}
