

document.addEventListener("DOMContentLoaded", () => {

	const newRadio = e$('#new-save-radio');
	const fullRadio = e$('#100-save-radio');
	const loadRadio = e$('#own-save-radio');
	const loadInput = e$('#save-file-input');
	const randomSeedButton = e$('#random-seed-button');
	const loadSeedButton = e$('#load-seed-button');

	//load layout elements
	settings.checkboxes.relic = listCraftable('relic');
	settings.checkboxes.potion = listCraftable('potion');
	populateAltar();
	loadLootTables ();


	
	//set initial values
	randomSeed();
	newRadio.checked = true;
	 

	newRadio.addEventListener('change', async function () {
		if (this.checked) {
			settings = await loadSave(this);
			applySettings(settings);
		}
		//loadSave(this);
	});
	fullRadio.addEventListener('change', async function () {
		if (this.checked) {
			settings = await loadSave(this);
			applySettings(settings);
		}
		//loadSave(this);
	});	
	loadRadio.addEventListener('change', async function() {
		if (this.checked && loadInput.files[0]) {
			settings = await loadSave(this,loadInput.files[0])
			applySettings(settings)
		}
		/*if (loadInput.files[0]) {
			loadSave(this, loadInput.files[0]);
		}*/
		else if(this.checked) {
			loadInput.click();
		}
	});
		
	//save file input
	loadInput.addEventListener('change', async function () {
		loadRadio.checked = true;
		settings = await loadSave(loadRadio, loadInput.files[0]);
		applySettings(settings);
		//loadSave(loadRadio, loadInput.files[0]);
	}); 

	//random seed-button
	randomSeedButton.addEventListener('click', randomSeed);	
	loadSeedButton.addEventListener('click', loadSeed);	 

});

