

document.addEventListener("DOMContentLoaded", () => {

	const newRadio = e$('#new-save-radio');
	const fullRadio = e$('#100-save-radio');
	const loadRadio = e$('#own-save-radio');
	const loadInput = e$('#save-file-input');
	const randomSeedButton = e$('#random-seed-button');
	const loadSeedButton = e$('#load-seed-button');

	//load layout elements
	listCraftable('relic');
	listCraftable('potion');
	populateAltar();
	loadLootTables ();


	
	//set initial values
	randomSeed();
	newRadio.checked = true;
	 

	newRadio.addEventListener('change', async function () {
		if (this.checked) {
			settings = loadSave(this);
			applySettings(settings);
			loadSeed();
		}
		//loadSave(this);
	});
	fullRadio.addEventListener('change', async function () {
		if (this.checked) {
			settings =loadSave(this);
			applySettings(settings);
			loadSeed();
		}
		//loadSave(this);
	});	
	loadRadio.addEventListener('change', async function() {
		if (this.checked && loadInput.files[0]) {

			const file = loadInput.files[0];
  			const reader = new FileReader();

			reader.onload = (e) => {
				settings = loadSave(loadRadio, <string>e.target.result);
				applySettings(settings)
				loadSeed();
			};

			reader.readAsText(file);
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

		const file = loadInput.files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			settings = loadSave(loadRadio, <string>e.target.result);
			applySettings(settings)
			loadSeed();
		};

		reader.readAsText(file);
		//loadSave(loadRadio, loadInput.files[0]);
	}); 

	//random seed-button
	randomSeedButton.addEventListener('click', randomSeed);	
	loadSeedButton.addEventListener('click', loadSeed);	 

});

