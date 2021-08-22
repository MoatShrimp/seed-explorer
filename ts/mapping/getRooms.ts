const trial = {
  isFunction: (flag) => {console.log("hello")}
}

function getRooms(zone, floor, flags, seed?,) {  

  const data = zoneData[zone][4][floor-1];
  seed = (seed ?? parseInt(e$("seed-input").value)) + floor;
  const rand = new Random(seed);
  const enemyCombos = [3,5,6];
  const seenRooms = [];
  const output = [];
  const map = maps[zone];
  const level = map.levels[floor - 1];
  settings.flags.floor_number = data.floorNumber;
  let previousRoom = null;

  for (const roomGroup of level) {
    output.concat(getAllFromGroup(roomGroup, 1));

  }
  return output;


  function getAllFromGroup (roomGroup, recursionCount = 1) {
    previousRoom = null;
    const output = [];
    for (const room of roomGroup) {
      const currentRoom = getRoom(room);
      if (currentRoom) {
        output.push(currentRoom);
        if (currentRoom.sequence && recursionCount) {
          output.concat(getAllFromGroup(currentRoom.sequence, --recursionCount));
        }
      }
      else {
        break;
      }
    }
    return output;
  }

  function getRoom (room){
    
    if (room.chance && !rand.chance(room.chance)) { 
      console.log(`%cSkipping ${room.tags}, failed chance`, "color: #bada55");
      return null;       
    }
    
    else if (room.floorChance && !rand.chance(room.floorChance(data.floorNumber))) { 
      console.log(`%cSkipping ${room.tags}, failed floorChance`, "color: #bada55");
      return null;       
    }

    if (room.requirements && !room.requirements(flags)) {
      console.log(`%cSkipping ${room.tags}, failed requirements`, "color: #daba55");
      return null; 
    }
    const usedZone = encounters[room.zone] ?? encounters[map.default.zone];

    const stage = room.stage[rand.range(0, room.stage.length)];

    const tags = room.tags.split(",");
    let roomOut = null;
    let foundRoom = null;

    for (const tag of tags) {

      const encounterGroup = usedZone[stage][tag]?.rooms;      
      if(encounterGroup) {

          const filteredRooms = encounterGroup.filter(current => {
            const withDefault = {...usedZone[stage][tag]?.default, ...current};
          
            return (!seenRooms.includes(current) &&
                    (!withDefault.requirements || withDefault.requirements(flags))
            )
          });
          console.log(filteredRooms);
          //if (filteredRooms.length){
          foundRoom = rand.getWeightedTable(filteredRooms);
          if (foundRoom) {
            seenRooms.push(foundRoom);
            const withDefault = {...usedZone[stage][tag]?.default, ...foundRoom};
            roomOut =  {name:`${zone}_${stage}_${tag}_${withDefault.name}`, sequence:withDefault.sequence, door:withDefault.door ?? "normal"};
            
            if (foundRoom.weightedDoor) {
                roomOut.door = rand.getWeightedTable(withDefault.weightedDoor).door;
            }
            else {
              //rand.next;
            }
            roomOut.direction = room.direction;
            roomOut.enemies = determineEnemies(withDefault);
            console.log(`${roomOut.name} with enemies: ${roomOut.enemies}`);
            
            break;
          }
          else  {
            console.log(`No room for tag: "${tag}" found`);
            roomOut = null;
          }
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
                roomOut.door = rand.getWeightedTable(foundRoom.weightedDoor).door;
            }
            else {
              //rand.next;
            }
            roomOut.direction = room.direction;
            roomOut.enemies = determineEnemies(foundRoom);
            console.log(roomOut.name)
            break;
          }
          else {
            console.log(`%cSkipping ${room.tags}, failed internal requirements`, "color: #daba55");
            roomOut = null; }
      }
    }
    if (previousRoom && roomOut) {
        roomOut.previousRoom = previousRoom;
    }
    previousRoom = roomOut;
    
    return roomOut;
  }

  function determineEnemies (encounter){

    let encounterChance = 0;
    if (encounter.difficulty) {encounterChance = encounter.difficulty[0]};
    if (rand.chance(encounterChance)) {

      const enemies = [];
      const difficultyAdjustemnt = encounter.difficulty[1] ?? 0;
      let enemyList = encounter.enemies ?? data.enemies;
      if (encounter.prohibitedEnemies) {
        enemyList = enemyList.filter( enemy => !encounter.prohibitedEnemies.includes(enemy.name) );
      }
      if (enemyList.length) {
        enemyList = rand.shuffle(enemyList);
        let enemyCombo = 0;
        for (const enemyType of enemyCombos) {
          if (enemyList[0].type & enemyType) {
            enemyCombo = enemyType;
            break;
          }
        }
        
        enemyList = enemyList.filter( enemy => enemy.type & enemyCombo);
        let num = Math.min(enemyList.length, rand.arrayPick(data.enemyTypeWeight));

        if(num) {
          enemyList = rand.shuffle(enemyList);
          const pickedEnemies = [];
          for(const enemy of enemyList) {
            if (num != 1 || enemy.canBeSolo) {
              if ((enemy.type & enemyCombo || !enemyCombo)) {
                pickedEnemies.push(enemy);
                enemyCombo ^= enemy.type;
              }
              if (pickedEnemies.length === num) {
                break;
              }
            }
          }

          if (pickedEnemies.length) {
            let remainingDifficulty = data.difficulty + difficultyAdjustemnt;
            const totalOfType = [];

            for (const enemy of pickedEnemies) {
              enemies.push(enemy.name);
              remainingDifficulty -= enemy.difficulty;
              totalOfType.push(1);
            }
            while (remainingDifficulty > 0 && pickedEnemies.length > 0) {
              const i = rand.range(0, pickedEnemies.length);
              const enemy = pickedEnemies[i];
              if(enemy.difficulty > remainingDifficulty  || (enemy.max > 0 && enemy.max == totalOfType[i])) {
                pickedEnemies.splice(i, 1);
              }
              else {
                enemies.push(enemy.name);
                remainingDifficulty -= enemy.difficulty;
                ++totalOfType[i];
              }
            }
          }
          return enemies;
        }
      }
    }
    return null;
  }
}
      