function getRooms(floor, seed?) {

    function requirements(check:string):boolean{
        if(check == undefined){
            return true;
        }

        const s$ = settings.flags;
        switch (check) {
            case "noRelicHex":
                return !s$.relicHex;
            case "dogShadowNotFound":
                return s$.dog_shadow_found && (s$.delve_count > 5);
            case "thisRunBardNotMet":
                return !s$.bard_met;
            case "bogUnlocked":
                return !!s$.bog_unlocked;
            case "noTreasureNote":
                return !s$.secret_treasure_note;
            case "noRatBond":
                return !s$.foundRatBond;
            case "priestessMet":
                return s$.priestess_met > 2;
            case "guacamole":
                return !!s$.haveGuacamole;
            case "dodsonNotRescued":
                return !s$.peasant1_unlocked;
            case "waylandNotRescued":
                return !s$.blacksmith_rescued && !s$.foundWaylandsBoots;
            case "noGreenShroom":
                return !s$.mushroom_green && !!s$.apprentice_met;
            case "noBlueShroom":
                return !s$.mushroom_blue && !!s$.apprentice_met;
            case "blackRabbitNotMet":
                return !s$.black_rabbit_met;
            case "hoodieNotMet":
                return !!s$.rockmimic_defeated && !s$.hoodie_met_mine;
            case "hoodieMet":
                return !!s$.rockmimic_defeated && !!s$.hoodie_met_mine;
            case "thisRunFountainNotFound":
                return !!s$.bog_unlocked && !s$.tribute_fountain_encountered;
            case "blackRabbitMet":
                return !s$.black_rabbit_met;
            case "devleCount8+":
                return s$.delve_count > 8;
            case "dibbleNotComplete":
                return !!s$.peasant2_unlocked && (s$.dibble_upgrade_count < 4);
            case "noDodsonKey":
                return !s$.prisoner_key;
            case "noPurpleShroom":
                return !s$.mushroom_purple && !!s$.apprentice_met;
            case "apprenticeNotMet":
                return !s$.apprentice_met && !!s$.blacksmith_rescued;
            case "haveAllShrooms":
                return s$.apprentice_met === 4;
            case "whip":
                return !!s$.haveWhip;
            case "hat":
                return !s$.haveHat;
            case "thisRunAltarNotFound":
                return !s$.altar_encountered;
            case "thisRunAltarNotFound":
                return !s$.altar_encountered;
            case "thisRunAltarNotFound":
                return !s$.altar_encountered;
            case "thisRunAltarNotFound":
                return !s$.altar_encountered;
            case "thisRunAltarNotFound":
                return !s$.altar_encountered;
            default:
                return false;
        }
    }

    function getRoom (room){
        if ((room.chance ?? 1) < 1 && room.chance < randLayout.value) {
            console.log(`Skipping room: ${room.tag} due to low chance`)
            return false;
        }
        if (!requirements(room.requirement)) {
            console.log(`Skipping room: ${room.tag} due to invalid requirements`)
            return false;
        }
        const type = room.roomTypes[randLayout.range(0, room.roomTypes.length)];
        if(mineEncounterGroups[type][room.tag]) {
            return randLayout.getWeightedTable(mineEncounterGroups[type][room.tag]);
        }
        else {
             console.log(type)
            return mineEncounterGroups[type].direct.find( encounter => encounter.roomTag === room.tag);
        }
    }


    seed = seed ?? parseInt(e$('seed-input').value) + 1;
    const randLayout = new Random(seed);

    for (const roomGroup of floor) {
        for (const room of roomGroup) {

            const currentRoom = getRoom(room);

            if (currentRoom) {

                if (!requirements(currentRoom.requirement)) {
                    console.log(`Skipping room: ${currentRoom.roomName} due to internal requirements`)
                    continue;
                }

                else {
                    currentRoom.weight = 0;
                    console.log(currentRoom.roomName)
                }

                let nextRoom = null;
            
                if (currentRoom.sequence) {

                    const nextRoom = getRoom(currentRoom.sequence);

                    if (nextRoom) {

                        if (!nextRoom.requirements) {
                            console.log(`Skipping sub-room: ${nextRoom.roomName} due to internal requirements`)
                            continue;
                        }
                        else {
                            nextRoom.weight = 0;
                            console.log(nextRoom.roomName)
                        }
                    }
                }
            }
        }
    }
}
        