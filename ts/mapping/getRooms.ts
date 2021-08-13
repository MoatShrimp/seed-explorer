const trial = {
  isFunction: (flag) => {console.log("hello")}
}

function getRooms(zone, floor, flags, seed?,) {  
  seed = (seed ?? parseInt(e$("seed-input").value)) + floor;
  rand.layout = new Random(seed)
  //let count = 0;
  //let previousRoom = null;
  const seenRooms = [];
  const output = [];
  const map = maps[zone];
  const level = map.levels[floor - 1];

  for (const roomGroup of level) {
    output.concat(getAllFromGroup(roomGroup, 1));
  }
  return output;
/*
      previousRoom = null;

      for (const room of roomGroup) {          

          const currentRoom = getRoom(room);

          if (currentRoom) {
            roomOutput.push(currentRoom);
              if (currentRoom.sequence) {
                roomOutput.push()
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
*/
  function getAllFromGroup (roomGroup, recursionCount = 1) {
    let previousRoom = null;
    let output = [];
    for (const room of roomGroup) {
      const currentRoom = getRoom(room, previousRoom);
      if (currentRoom) {
        output.push(currentRoom);
        if (currentRoom.sequence && recursionCount) {
          output.concat(getAllFromGroup(currentRoom.sequence, --recursionCount));
        }
      }
    }
    return output;
  }

  function getRoom (room, previousRoom){
    console.log(rand.layout.state);
    
    if ((room.chance ?? 1) < 1 && (room.chance < (rand.layout.value))) { return null; }
    if (room.requirements && !room.requirements(flags)) { return null; }
    const usedZone = encounters[room.zone] ?? encounters[map.default.zone];
    const stage = room.stage[rand.layout.range(0, room.stage.length)];
    const tags = room.tags.split(",");
    let roomOut = null;
    let foundRoom = null;

    for (const tag of tags) {
        const encounterGroup = usedZone[stage][tag]?.rooms;
        
        if(encounterGroup) {
            const filteredRooms = encounterGroup.filter(current => 
              !seenRooms.includes(current) &&
              (!current.requirements || current.requirements(flags))
            );
            console.log(filteredRooms);
            if (filteredRooms.length){
                foundRoom = rand.layout.getWeightedTable(filteredRooms);
                seenRooms.push(foundRoom);
                foundRoom = {...foundRoom, ...usedZone[stage][tag]?.default};
                roomOut =  {name:`${zone}_${stage}_${tag}_${foundRoom.name}`, sequence:foundRoom.sequence, door:foundRoom.door};
                if (foundRoom.weightedDoor) {
                    roomOut.door = rand.layout.getWeightedTable(foundRoom.weightedDoor).door;
                }
                else {
                  //rand.layout.next;
                }
                roomOut.direction = room.direction;
                console.log(roomOut.name)
                break;
            }
            else roomOut = null;
        }
        else {
            const foundRooms = usedZone[stage].special.rooms.filter(
              encounter => (encounter.tag === tag));

            for (const room of foundRooms) {
              if (!room.requirements || room.requirements(flags)) {
                foundRoom = room;
                break;
              }
            }            
            
            if (foundRoom) {
              
              seenRooms.push(foundRoom);
              roomOut =  {name:`${zone}_${stage}_${tag}_${foundRoom.name}`, sequence:foundRoom.sequence, door:foundRoom.door};
              if (foundRoom.weightedDoor){
                  roomOut.door = rand.layout.getWeightedTable(foundRoom.weightedDoor).door;
              }
              else {
                //rand.layout.next;
              }
              roomOut.direction = room.direction;
              console.log(roomOut.name)
              break;
            }
            else {  roomOut = null; }
        }
    }
    if (previousRoom && roomOut) {
        roomOut.previousRoom = previousRoom;
    }
    previousRoom = roomOut;
    return roomOut;
  }
}
      