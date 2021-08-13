function getRooms(zone, floor, seed?, seenRooms = [], ) {

    seed = (seed ?? parseInt(e$("seed-input").value)) + floor;
    let count = 0;
    let previousRoom = null;

    const zeroPad = (num, places) => String(num).padStart(places, "0")
    
    function requirements(check:string):boolean{
        if(check == undefined){
            return true;
        }

        const s$ = settings.flags; //shorthand for each check
        switch (check) {
            case "noRelicHex":
                return !s$.relicHex;
            case "dogShadowNotFound":
                return !s$.dog_shadow_found && (s$.delve_count > 5);
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
                return (floor === 1) && !!s$.rockmimic_defeated && !s$.hoodie_met_mine;
            case "hoodieMet":
                return (floor === 1) && !!s$.rockmimic_defeated && !!s$.hoodie_met_mine;
            case "thisRunFountainNotFound":
                return !!s$.bog_unlocked && !s$.tribute_fountain_encountered;
            case "blackRabbitMet":
                return !!s$.black_rabbit_met;
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
                return !!s$.haveHat;
            case "circinus":
                return !!s$.haveCircinus;
            case "thisRunAltarNotFound":
                return !s$.altar_encountered;
            default:
                return false;
        }
    }

    function getRoom (room){
        let value = null;
        if ((room.chance ?? 1) < 1 && (room.chance < (value = rand.layout.value))) {
            //console.log(`%cSkipping room ${room.tag}: Chance failed`, "color:#a09;")
            return false;
        }
        if (!requirements(room.requirement)) {
            //console.log(`%cSkipping room ${room.tag}: Requirements not met`, "color:#a00;")
            return false;
        }
        //console.log(value)
        if (room.tag == "secret") {
        }
        
        const type = room.roomTypes[rand.layout.range(0, room.roomTypes.length)];


        const tags = room.tag.split(",");
        let roomOut = null;
        let foundRoom = null;
        for (const tag of tags) {
            const encounterGroup = mineEncounterGroups[type][tag];
            if(encounterGroup) {

                const filteredRooms = encounterGroup.filter(current => !seenRooms.includes(current) && requirements(current.requirement));
                //console.log(filteredRooms)
                if (filteredRooms.length){

                    foundRoom = rand.layout.getWeightedTable(filteredRooms);
                    //console.log(foundRoom);
                    
                    roomOut =  {roomName:foundRoom.roomName, sequence:foundRoom.sequence, weight:(room.weight??0)};
                    //console.log(roomOut);
                    //roomOut = rand.layoutLayout.getWeightedTable(filteredRooms);
                    //console.log(seed + " gives " + roomOut.roomName)
                    if (foundRoom.weightedDoorTypes) {
                        roomOut.doorType = rand.layout.getWeightedTable(foundRoom.weightedDoorTypes).doorType;
                    }
                    break;
                }
                else {
                //console.log(`%cSkipping encounter ${tag}: Requirements not met`, "color:#a00;");
                    roomOut = false;
                }
            }
            else {
                foundRoom =  mineEncounterGroups[type].direct.find( encounter => (encounter.roomTag === tag) && requirements(encounter.requirement)) ?? false;

                
                //roomOut =  mineEncounterGroups[type].direct.find( encounter => (encounter.roomTag === tag) && requirements(encounter.requirement)) ?? false;


                if (foundRoom) {
                    roomOut =  {roomName:foundRoom.roomName, sequence:foundRoom.sequence, weight:(room.weight??0)};
                    if (foundRoom.weightedDoorTypes){
                        roomOut.doorType = rand.layout.getWeightedTable(foundRoom.weightedDoorTypes).doorType;
                    }
                    roomOut.direction = room.direction;
                    break;
                }
                else {
                    //console.log(`%cSkipping encounter ${tag}: Requirements not met`, "color:#a00;");
                    roomOut = false;
                }
            }
        }
        if (previousRoom && roomOut) {
            roomOut.previousRoom = previousRoom;
        }
        previousRoom = roomOut;
        return roomOut;
    }

    
    for (const roomGroup of zone[floor - 1]) {
        previousRoom = null;
        for (const room of roomGroup) {
            

            const currentRoom = getRoom(room);

            if (currentRoom === false){
                break;
            }

            if (currentRoom) {
                seenRooms.push(currentRoom);
                if (currentRoom.doorType){
                    //console.log(`${zeroPad(++count,2)}: ${currentRoom.roomName}, %cDoor: ${currentRoom.doorType}`, "color:#a70;")
                }
                else {
                    //console.log(`${zeroPad(++count,2)}: ${currentRoom.roomName}`)
                }
                if (currentRoom.sequence) {

                    const nextRoom = getRoom(currentRoom.sequence);
                    
                    if (nextRoom) {
                        seenRooms.push(nextRoom);
                        previousRoom = currentRoom;
                        if (nextRoom.doorType){
                            //console.log(`${zeroPad(++count,2)}: ${nextRoom.roomName}, Door: ${nextRoom.doorType}`)
                        }
                        else {
                            //console.log(`${zeroPad(++count,2)}: ${nextRoom.roomName}`)
                        }
                    }
                }
            }
        }
    }
    return seenRooms;
}
        
