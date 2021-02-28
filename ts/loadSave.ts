async function loadSave(radio:HTMLInputElement, file?:any) {

	const settingsOut = {
		checkboxes: {
			relic: null,
			potion: null
		},
		'altarRelic': -1,
		flags: {
			'shop_basic_item':  0,
			'shop_food': 0,
			'shop_potion_relic': 0,
			'dibble_extra_item': 0,
			'dibble_relic': 0
		}
	}

	Object.values(e$('#relic-selection').getElementsByTagName('input'));
	const CBRelic: HTMLInputElement[] = e$('#relic-selection').getElementsByTagName('input');
	const CBPotion: HTMLInputElement[] = e$('#potion-selection').getElementsByTagName('input');

	switch(radio.value) {
		case 'own':

			const readUploadedFileAsText = (inputFile):any => {
				const reader = new FileReader();
				
				return new Promise((resolve, reject) => {
					reader.onerror = () => {
						reader.abort();
					reject(new DOMException("Problem parsing save file."));
					};
				
					reader.onload = () => {
					resolve(reader.result);
					};
					reader.readAsText(inputFile);
				});
			};

			const handleUpload = async () => {	  
				try {
				  const saveContents:string = await readUploadedFileAsText(file) 
				  const saveData = JSON.parse(saveContents)
				  

				  if ('altarItemID' in saveData && 'peonID' in saveData) {	

						interface relicIDs {
							box: {
								value:0;
							}
						}

						const relicIDs: number[] = saveData.unlocked.map( craftedGUID => masterTable.relic.findIndex( relic => relic.guid === craftedGUID));	
						settingsOut.checkboxes.relic = Object.values(CBRelic).filter( box => relicIDs.find((ID => box.value == ID.toString())));

						const potionIDs: number[] = saveData.unlocked.map( craftedGUID => masterTable.potion.findIndex( potion => potion.guid === craftedGUID));
						settingsOut.checkboxes.potion = Object.values(CBPotion).filter( box => potionIDs.find((ID => box.value == ID.toString())));
						settingsOut.altarRelic = masterTable.relic.findIndex( relic => relic.guid == saveData.altarItemID);
						
						saveData.upgradeString.split(',').forEach( item => {
							let [key, value] = item.split(':');
							settingsOut.flags[key] = value;
						});		
					}

				} catch (e) {
				  console.warn(e.message)
				}
			  }

			await handleUpload();

			break;
		case '100':
			settingsOut.checkboxes.relic = Object.values(CBRelic);
			settingsOut.checkboxes.potion = Object.values(CBPotion);
			settingsOut.altarRelic = 149;
			settingsOut.flags['shop_basic_item'] = 2;
			settingsOut.flags['shop_food'] = 3;
			settingsOut.flags['shop_potion_relic'] = 3;
			settingsOut.flags['dibble_extra_item'] = 1;
			settingsOut.flags['dibble_relic'] = 1;
	}

	return settingsOut;
}