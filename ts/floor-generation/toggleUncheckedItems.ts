//check for unchecked boxes and zero linked items in various loot tables
function toggleUncheckedItems(): void {

    //list both groups of checkboxes
	const CBRelic: HTMLInputElement[] = Object.values(e$("relic-selection").getElementsByTagName("input"));
	const CBPotion: HTMLInputElement[] = Object.values(e$("potion-selection").getElementsByTagName("input"));

	toggleWeight( CBRelic.flatMap( box => !(box.checked) ? parseInt(box.value) : []) , "relic");
	toggleWeight( CBPotion.flatMap( box => !(box.checked) ? parseInt(box.value) : []) , "potion");
}
