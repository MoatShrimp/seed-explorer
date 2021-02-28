async function applySettings (settings) {

    console.log(settings.altarRelic);
    checkAll(e$('#relic-selection').getElementsByTagName('input'), false);
    if (settings.checkboxes.relic) {
        checkAll(settings.checkboxes.relic, true);
    }
    

    checkAll(e$('#potion-selection').getElementsByTagName('input'), false);
    if (settings.checkboxes.potion) {
        checkAll(settings.checkboxes.potion, true);
    }
    e$('altar').value = settings.altarRelic;
}