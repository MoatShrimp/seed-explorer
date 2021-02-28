//using global variable [masterTable, rand] from master-table.js
//using global variable [lootTables] from global-variables.js

//setup weighted loot tables with each weighted position linking to an item inside the masterTable
function loadLootTables () {
	Object.values(masterTable).forEach((subTable) => {
		subTable.forEach((item, masterIndex) => {		
			Object.entries(item.tables).forEach(([key, table]) => {
				const tableB: any = table;
				lootTables[key][tableB.index] = {"weight":tableB.weight, "masterIndex":masterIndex};
			});
		});
	});
}

function nextItem (table = 'relic', randState = 'relic') {
	table = lootTables[table];
	const itemID = rand[randState].getWeightedElement(table);
	return {"relic":masterTable.relic[itemID], "masterIndex":itemID};
}

//toggling item weight
function toggleWeight (indices:any = 157, subTable = 'relic', isZero = true) {
	
	if (!Array.isArray(indices)) { 
		indices = [indices];
	}
	
	indices.forEach((index) => {
		Object.entries(masterTable[subTable][index].tables).forEach(([key, table]) => {
			const tableB: any = table;
			lootTables[key][tableB.index].weight = (tableB.weight * <number><unknown>!isZero);
		});
	});
}



//removing Othermine only items
function toggleOthermine (on = false) {
	toggleWeight([133, 134, 157], 'relic', !on);
}
