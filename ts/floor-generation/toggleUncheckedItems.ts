//check for unchecked boxes and zero linked items in various loot tables
function toggleUncheckedItems(): void {

    //list both groups of checkboxes
	const CBRelic: HTMLInputElement[] = Object.values(e$("#relic-selection").getElementsByTagName("input"));
	const CBPotion: HTMLInputElement[] = Object.values(e$("#potion-selection").getElementsByTagName("input"));

	const unckeckedBoxes = CBRelic.filter(box => !box.checked);
	const unckeckedPotions = CBPotion.filter(box => !box.checked);

	const missing: number[] = unckeckedBoxes.map((box) => parseInt(box.value));
	const missingPotions: number[] = unckeckedPotions.map((box) => parseInt(box.value));

	toggleWeight(missing, "relic");
	toggleWeight(missingPotions, "potion");
}
