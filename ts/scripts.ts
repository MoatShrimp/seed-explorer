
const saveSelection = e$("save-radio-selecion");
const newRadio = e$('new-save-radio');
const fullRadio = e$('100-save-radio');
const loadRadio = e$('own-save-radio');
const loadInput = e$('save-file-input');
const randomSeedButton = e$('random-seed-button');
const loadSeedButton = e$('load-seed-button');

//load layout elements
listCraftable('relic');
listCraftable('potion');
populateAltar();
loadLootTables ();

//set initial values
randomSeed();

const radioEvent = new Event("change");

e$("menu-options").addEventListener("change", () => loadSeed());

e$("save-radio-selecion").addEventListener("change", (event) => {

	if (loadRadio.checked) {
		if (loadInput.files[0]) {

			let file = loadInput.files[0];
			const reader = new FileReader();
			
			reader.onload = (e) => {
				settings = loadSave(loadRadio, <string>e.target.result);					
				applySettings(settings)
				loadSeed();
			};

			reader.readAsText(file);
		}
		else {
			loadInput.click();
		}
	}
	else if (fullRadio.checked) {
		settings = loadSave(fullRadio);
		applySettings(settings);
		loadSeed();
	}
	else {
		settings = loadSave(newRadio);
		applySettings(settings);
		loadSeed();
	}
});

//save file input
loadInput.addEventListener('change', () => {
	loadRadio.checked = true;
	e$("save-radio-selecion").dispatchEvent(radioEvent)
}); 

//random seed-button
randomSeedButton.addEventListener('click', randomSeed);	
loadSeedButton.addEventListener('click', loadSeed);	 

fullRadio.checked = true;
e$("save-radio-selecion").dispatchEvent(radioEvent)