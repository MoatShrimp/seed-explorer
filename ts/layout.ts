//using global variables f

//populate checkboxes
function listCraftable (table) {

	const selection = document.getElementById(`${table}-selection`);
	//reset content
	selection.innerHTML = `<legend>Crafted ${table}s</legend>`;
	
	masterTable[table].forEach((item, index) => {
		
		if (item.crafting != '-') {
			
			const itemCheckbox = document.createElement('input');			
			itemCheckbox.type = 'checkbox';
			itemCheckbox.value = index;
			
			const itemLable = document.createElement('label');
			itemLable.appendChild(itemCheckbox);
			itemLable.innerHTML += item.display;
			
			selection.appendChild(itemLable);
		}
	});
}

//toggle all checkboxes in collection
function checkAll(boxCollaction, toggle) {
	for (const box of boxCollaction) {
			box.checked = toggle;
	}
}

function populateAltar() {
	
	const relics = [];
	const altarSelection = <HTMLSelectElement>document.getElementById('altar');
	masterTable.relic.forEach((relic, index) => {
		relics.push([relic.display, index]);
	});
	
	relics.pop(); //remove duplicate silver card relic in place to compensate for an in-game bug
	relics.sort(); //alphabetic order or easier lookup
	
	for (const [display, index] of relics) {
		const selection = document.createElement("option");
		selection.value = index;
		selection.text = display;
		altarSelection.add(selection);
	}

	altarSelection.value = '';
	
}