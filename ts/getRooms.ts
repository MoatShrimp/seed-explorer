function getRooms(floor, seed) {

    seed = parseInt(e$('seed-input').value) + 1;
    const randLayout = new Random(seed);
    const door = 0;
    for (const roomGroup of floor) {
        for (const room of roomGroup) {
            //console.log(randLayout.seed)
           // console.log(room)

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

            const currentRoom = getRoom(room);

            if (currentRoom.requirements) {
                //randLayout.next;
                console.log(`Skipping room: ${currentRoom.name} due to internal requirements`)
                continue;
            }

            if (currentRoom) {
                currentRoom.weight = 0;
                console.log(currentRoom.name)
            }

            let nextRoom = null;
        
            if (currentRoom.sequence) {
                nextRoom = getRoom(currentRoom.sequence);
                if (nextRoom.requirements) {
                    console.log(`Skipping sub-room: ${nextRoom.name} due to internal requirements`)
                    nextRoom= null;
                }       
            }

            if (nextRoom) {
                nextRoom.weight = 0;
                console.log(nextRoom.name)
            }

        }
    }
}
        