//load new random seed
function randomSeed(){
	e$("#seed-input").value  = <string><unknown>seedRand.rangeInclusive(1, 99999999);
	//$('#seed-input').value = 68906772; // map at Diibble, sequence breaker in mine1
	loadSeed();
}

//update rand for new seed
function nextRand (seed) {
	Object.keys(rand).forEach((key) => {
		rand[key] = new Random(seed);
	});  
}

let loadSeed = () => {		
		start(parseInt((e$("#seed-input").value)));
}

//remove items from unchecked check-boxes from the lootTable
function toggleUncheckedItems (): void {

	const CBRelic: HTMLInputElement[] = Object.values(e$("#relic-selection").getElementsByTagName("input"));
	const CBPotion: HTMLInputElement[] = Object.values(e$("#potion-selection").getElementsByTagName("input"));

	const unckeckedBoxes = CBRelic.filter( box => !box.checked);
	const unckeckedPotions = CBPotion.filter( box => !box.checked);

	const missing = unckeckedBoxes.map((box) => box.value);
	const missingPotions = unckeckedPotions.map((box) => box.value);

	toggleWeight(missing, "relic");
	toggleWeight(missingPotions, "potion");

}

function start(seed){
	e$('#levels').innerHTML = '';
	loadLootTables ();
	nextRand(seed);
	//toggleMissing();
	//toggleOthermine();
	let currentRelics;
	let relicText;
	toggleWeight(3, 'food');
	toggleWeight(66, 'potion');
	//toggleWeight(4, 'item');
	toggleWeight(133);
	toggleWeight(134);
	toggleWeight(157);   
	
	dibble(seed);
	
	if (e$('#altar').value) {
		toggleWeight(e$('#altar').value);
	}

	
	nextZone('mine', 0, 'The Goldmines', seed);
	nextZone('dungeon', 1, 'Delvemore Dungeon', seed);
	nextZone('halls', 2, 'Halls of Din', seed);
	nextZone('caverns', 3, 'The Shimmering Caverns', seed);
	nextZone('core', 4, 'Golden Core', seed);
	   
	   

	function nextZone (zone, zoneID, title, seed){
		
		
		seed += zoneID * 5;
		
		let field = document.createElement("fieldset");
		field.id = zone;
		field.classList.add('zone');
		let legend = document.createElement("legend");
		legend.textContent = title;
		field.appendChild(legend);
		e$('#levels').appendChild(field);
	
		for (let i = 1; i <= 4; ++i) { 
			nextRand(seed + i);
			
			let subfield = document.createElement("fieldset");
			subfield.id = zone + i;
			subfield.classList.add('level');
			let sublegend = document.createElement("legend");
			sublegend.textContent = 'Level ' + i;
			subfield.appendChild(sublegend);
			e$('#' + zone).appendChild(subfield);
			 
			let relicRoom = document.createElement("div");
			relicRoom.id = 'relic' + zone + i;
			relicRoom.classList.add('icon-relicOn');
			e$('#' + zone + i).appendChild(relicRoom);

			let relic:any; 
			if (((zoneID + i) == 1) && e$('#new-save-radio').checked) {
				relic = nextItem('relicStarter');
			}
			else {
				relic = nextItem('relic');
			}
			toggleWeight(relic.masterIndex);		   
			
					  
			relicText = document.createElement("div");
			relicText.classList.add('icon-relic');
			relicText.innerHTML = relic.relic.display;
			e$('#relic' + zone + i).appendChild(relicText);		   
			
			if ((zoneID + i) > 1){
				shop (zone, i);
			}
		}
	}
}