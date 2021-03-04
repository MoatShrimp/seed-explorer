function getRooms(floor, seed) {

    function requirements(check){
        if(check == undefined){
            return true;
        }
        switch (check.operator) {
            case "==":
                return settings.flags[check.key] == check.value;
            case "<":
                return settings.flags[check.key] < check.value;
            case ">":
                return settings.flags[check.key] > check.value;
            case ">=":
                return settings.flags[check.key] >= check.value;
            case "<=":
                return settings.flags[check.key] <= check.value;
            case "true":
                return settings.flags[check.key];
            case "false":
                return !settings.flags[check.key];
        }
    }

    function getRoom (room2){
        if (room2.chance < 1 && room2.chance < randLayout.value) {
            console.log(`Skipping room: ${room2.tag} due to low chance`)
            return false;
        }
        if (room2.skip == true) {
            console.log(`Skipping room: ${room2.tag} due to invalid requirements`)
            return false;
        }
        const type = room2.type[randLayout.range(0, room2.type.length)];
        if(mineEncounterGroups[type][room2.tag]) {
            return randLayout.getWeightedTable(mineEncounterGroups[type][room2.tag]);
        }
        else {
            return mineEncounterGroups.direct.find( encounter => encounter.m_value === room2.tag);
        }
    }


    seed = parseInt(e$('seed-input').value) + 1;
    const randLayout = new Random(seed);

    for (const roomGroup of floor) {
        for (const room of roomGroup) {

            const currentRoom = getRoom(room);

            if (currentRoom) {

                if (!requirements(currentRoom.requirements)) {
                    console.log(`Skipping room: ${currentRoom.name} due to internal requirements`)
                    continue;
                }

                else {
                    currentRoom.weight = 0;
                    console.log(currentRoom.name)
                }

                let nextRoom = null;
            
                if (currentRoom.sequence) {

                    const nextRoom = getRoom(currentRoom.sequence);

                    if (nextRoom) {

                        if (!nextRoom.requirements) {
                            console.log(`Skipping sub-room: ${nextRoom.name} due to internal requirements`)
                            continue;
                        }
                        else {
                            nextRoom.weight = 0;
                            console.log(nextRoom.name)
                        }
                    }
                }
            }
        }
    }
}
        