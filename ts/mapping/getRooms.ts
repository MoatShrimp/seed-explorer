function getRooms(floor:number, seed?, loops?) {  

  const flags = settings.flags;
  const floorData = getFloorData(floor, flags);
  seed = (seed ?? parseInt(e$("seed-input").value)) + floor;
  const rand = new Random(seed);
  const enemyCombos = [3,5,6];
  const seenRooms = [];
  let allRooms = [];
  const map = maps[floorData.map];
  const level = map.levels[floorData.index];
  flags.floor_number = floorData.floor;
  let previousRoom = null;
  for (const roomGroup of level) {
    allRooms = allRooms.concat(getAllFromGroup(roomGroup, 1));
  }
  //console.log(rand.state);
  allRooms = determineCoordinates(allRooms);
  let roomShuggle = [...allRooms];
  roomShuggle = addSetPieces(roomShuggle);
  roomShuggle = addExtras(roomShuggle);
  roomShuggle = addResource(roomShuggle);
  roomShuggle = crawlspace(roomShuggle);
  return allRooms;

  //Room Selector
  function getAllFromGroup (roomGroup, recursionCount = 1) {
    if (recursionCount > 0) {previousRoom = null;}
    let output = [];
    for (const room of roomGroup) {
      
      const currentRoom = getRoom(room, recursionCount);
      if (currentRoom) {        
        output.push(currentRoom);
        if (currentRoom.sequence && recursionCount) {
          output = output.concat(getAllFromGroup(currentRoom.sequence, --recursionCount));
        }
      }      
      else {
        recursionCount =  1;
        break;
      }
      recursionCount =  1;
    }
    return output;
  }

  function getRoom (room, recursionCount){
    //console.log(rand.state)

    if (room.chance && !rand.chance(room.chance)) { 
      //console.log(`%cSkipping ${room.tags}, failed chance`, "color: #bada55");
      return null;
    }
    else if (room.floorChance && !rand.chance(room.floorChance(floorData.floor))) { 
      //console.log(`%cSkipping ${room.tags}, failed floorChance`, "color: #bada55");
      return null;       
    }
   
    if (room.requirements && !room.requirements(flags)) {
      //console.log(`%cSkipping ${room.tags}, failed requirements`, "color: #daba55");
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
                   (!withDefault.requirements || withDefault.requirements(flags)) &&
                   (!previousRoom || allowNeighbor(withDefault, previousRoom))
            )
          });
          if (filteredRooms.length){
            foundRoom = rand.getWeightedTable(filteredRooms);
            if (foundRoom) {
              seenRooms.push(foundRoom);
              const withDefault = {...usedZone[stage][tag]?.default, ...foundRoom};
              roomOut =  {
                name:`${floorData.map}_${stage}_${tag}_${withDefault.name}`,
                sequence:withDefault.sequence,
                door:withDefault.door ?? door.normal,
                noExit:withDefault.noExit ?? direction.none,
                direction:withDefault.direction ?? direction.none,
                weight:room.branchWeight ?? 0,
                autoSpawn:withDefault.autoSpawn ?? 0,
                neighbors:[],
              };
              if (withDefault.weightedDoor) {
                  roomOut.door = rand.getWeightedTable(withDefault.weightedDoor).door;
              }
              
              else {
                //rand.next;
              }
              if (recursionCount < 1) {roomOut.secluded = true};
              roomOut.direction = room.direction;
              roomOut.enemies = determineEnemies(withDefault);
              if (roomOut.enemies) {
                console.log(`${roomOut.name} with enemies: ${roomOut.enemies}`);
              }
              else {
                console.log(`${roomOut.name}`);
              }
              
              break;
            }
          }
          else  {
            //console.log(`No room for tag: "${tag}" found`);
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
            roomOut =  {
              name:`${floorData.map}_${stage}_${tag}_${foundRoom.name}`,
              sequence:foundRoom.sequence,
              door:foundRoom.door ?? door.normal,
              noExit:foundRoom.noExit ?? direction.none,
              direction:foundRoom.direction ?? direction.none,
              weight:room.branchWeight ?? 0,
              autoSpawn:foundRoom.autoSpawn ?? 0,
              neighbors:[],
            };
            
            if (foundRoom.weightedDoor){
                roomOut.door = rand.getWeightedTable(foundRoom.weightedDoor).door;
            }
            
            else {
              //rand.next;
            }
            if (recursionCount < 1) {roomOut.secluded = true};
            roomOut.direction = room.direction;
            roomOut.enemies = determineEnemies(foundRoom);
            console.log(roomOut.name)
            break;
          }
          else {
           //console.log(`%cSkipping ${room.tags}, failed internal requirements`, "color: #daba55");
            roomOut = null; }
      }
    }
    if (previousRoom && roomOut) {
        roomOut.previousRoom = previousRoom;
    }
    if (recursionCount > 0) {previousRoom = roomOut};
    
    return roomOut;
  }

  //Enemy selector
  function determineEnemies (encounter){

    let encounterChance = 0;
    if (encounter.difficulty) {encounterChance = encounter.difficulty[0]};
    if (rand.chance(encounterChance)) {

      const enemies = [];
      const difficultyAdjustemnt = encounter.difficulty[1] ?? 0;
      let enemyList = encounter.enemies ?? floorData.enemies;
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
        let num = Math.min(enemyList.length, rand.arrayPick(floorData.enemyTypeWeight));

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
            let remainingDifficulty = floorData.difficulty + difficultyAdjustemnt;
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

  //Position selector
  function determineCoordinates(roomList) {
    const startingRoom = roomList[0];
    let positionedRooms = [];

    for (let trial = 0; trial < 10; ++trial ){

      roomList.forEach(room => {
        room.neighbours = [];
        room.position = {x:0, y:0};
      });

      positionedRooms = [startingRoom];
      roomList.slice(1).forEach(room => { //skipping the first room
        if (setRoomPosition(room)) {
            positionedRooms.push(room);
        }
      });
      if (positionedRooms.length === roomList.length) {
        //positionedRooms = movePosOrigo(positionedRooms);
        //console.table(getNeigbours(positionedRooms));
        //return positionedRooms.map(room => [room.roomName, room.position.x, room.position.y, room.neighbours]);
        const outArray = positionedRooms.map(room => [room.roomName, room.position.x, room.position.y]);
        //console.table(positionedRooms, ["roomName", "position", "binMap"]);
        //loop(() => {rand.next}, loops);
        positionedRooms = determineNeighbors(positionedRooms);
        return positionedRooms;
      }
      else {
          console.log(`%cLayout failed, trying again!`, "color:#a00;");
      }
    }
    return [false];

    function setRoomPosition(room) {
      let directions = [...cardinalDirections];
      let dir = room.direction ?? direction.none;

      if (room.previousRoom) {
        room.position = room.previousRoom.position;
      

        if (dir) {    
            if (canMove(room, dir)) {
                room.position = newPosition(room.position, dir);
            }
            else {
                dir = direction.none;
            }
        }

        else {
          directions = rand.shuffle(directions);
          for (const newDirection of directions) {
                if(canMove(room, newDirection)) {
                    dir = newDirection;
                    room.position = newPosition(room.position, dir);
                    break;
                }
            } 
        }
      }

      
      else if (room.door === door.none || room.door === door.hidden) {

        for (const startRoom of rand.shuffle(positionedRooms)) {
          room.position = startRoom.position;

          directions = rand.shuffle(directions);
          for (const newDirection of directions) {
            if (canMove(room, newDirection) ){
                dir = newDirection;
                room.position = newPosition(room.position, dir);
                break;
            }
          }

          if (dir) {
            break;
          }
        }
      }
      
      else {
        let weightedRooms = positionedRooms.filter(room => room.weight);
        
        while(!dir && weightedRooms.length > 0) {
          let startRoom = null;

          if (startRoom = rand.getWeightedTable(weightedRooms)){
              room.position = startRoom.position;
              directions = rand.shuffle(directions);

              for (const newDirection of directions) {
                  if (isValidNeighbor(room, startRoom, newDirection) && canMove(room, newDirection)) {
                      dir = newDirection;
                      room.position = newPosition(room.position, dir);
                      break;
                  }
              }

              weightedRooms = weightedRooms.filter(current => current != startRoom);
          }
        }
      }

      if (dir) {
        if (room.door != door.none && room.door != door.hidden) {
          let opposingDirection = opposite(dir);
          let opposingRoom = getRoomInPos(newPosition(room.position, opposingDirection));

          if (opposingRoom != null) {
              opposingRoom.neighbors[dir] = room;
              room.neighbors[opposingDirection] = opposingRoom;                
          }
        }

        return true;
      }

      return false;

           
    }
    //helpers
    function canMove(room, dir:direction) {
      if (room.previousRoom && !isValidNeighbor(room, room.previousRoom, dir)) return false;
      else if (!getRoomInPos(newPosition(room.position, dir))) return true;
      else return false;
    }

    function getRoomInPos(pos) {
        return roomList.find(room => (room.position.x === pos.x && room.position.y === pos.y));
    }    

    //verify that two rooms can be connected
    function isValidNeighbor(room1, room2, dir = direction.none) {            
        return dir ? validDirection(room1, room2, dir) : allowNeighbor(room1, room2);
        
        function validDirection(room1, room2, dir:direction) {
            return !(room2.noExit & dir) && !(room1.noExit & opposite(dir));
        }       
    }

    function newPosition(position, dir:direction) {
        const [xPos, yPos] = [position.x, position.y];
        switch (dir) {
            case direction.north: return {x:xPos, y:yPos-1}
            case direction.south: return {x:xPos, y:yPos+1}
            case direction.east: return {x:xPos+1, y:yPos}
            case direction.west: return {x:xPos-1, y:yPos}
            default: return {x:xPos, y:yPos}
        }
    }
    
    function determineNeighbors(rooms) {
      let num = 0;
      //console.log(`Start: ${rand.state}`);
      for (const room of rooms) {
        //console.log(`${room.name}`)
        if(!room.secluded && room.door === door.secret) {
          for (const dir of cardinalDirections) {

            const neighbor = getRoomInPos(newPosition(room.position, dir));
            //console.log(dir + " \t" + neighbor?.name);
            if( neighbor && 
                (isValidNeighbor(neighbor, room, dir)) &&
                (neighbor.door != door.none) &&
                (neighbor.door != door.hidden) &&
                (neighbor.door != door.crystal) &&
                (!neighbor.secluded) 
            ) {
              //console.log(`\t\tcconnecting ${room.name} and \n\t\t${neighbor.name}`)
              room.neighbors[dir] = neighbor;
              neighbor.neighbors[opposite(dir)] = room;
            }
          }
        }

        if (room.door === door.normal) {
          for (const dir of cardinalDirections) {
            const neighbor = getRoomInPos(newPosition(room.position, dir));
            //console.log(dir + " \t" + neighbor?.name);
            if (neighbor && 
                neighbor.door === door.normal &&
                (isValidNeighbor(neighbor, room, dir)) /*&& rand.chance(floorData.connectivity)*/) {
                  //console.log("\t\tValid connection")
              num++;
              if (rand.chance(floorData.connectivity)) {
                //console.log(`\t\tconnecting ${room.name} and \n\t\t${neighbor.name}`)
                room.neighbors[dir] = neighbor;
                neighbor.neighbors[opposite(dir)] = room;
              }
              
            }
            else {
              //console.log("\t\tInvalid")
            }
            
          }
        }        
      }
      //console.log(num)
      return rooms;
    }
  }
  
  //Extras selector
  function addSetPieces(roomList) { 

    for (const setPiece of floorData.setPieces) {
      
      const num = rand.range(setPiece.min, setPiece.max+1);
      for (let i = 0; i < num; ++i) {
        const item = getWeightedItem(setPiece);

        if (item) {
          roomList = rand.shuffle(roomList);
          //console.log(roomList);
          let pickedRoom = null;
          for (const room of roomList) {
            if (room.autoSpawn & 32) {
              pickedRoom = room;
              break;
            }
          }

          if (pickedRoom) {
            console.log("SetPiece: " + pickedRoom.name)
            if (!pickedRoom.setPiece) {pickedRoom.setPiece = []};
           // let list = [];
            ///for(const chooser of item.choosers) {
              //list.push(rand.getWeightedTable(chooser));
            //}
            pickedRoom.setPiece.push(item);
          }          
        }
      }      

      //const object = spawnSetPiece(setPiece);
    }
    return roomList;   
  }

  function addExtras(roomList) { 
    let total = [];
    for (const extra of floorData.extras) {
      
      const num = rand.range(extra.min, extra.max+1);
      for (let i = 0; i < num; ++i) {
        const item = getWeightedItem(extra);

        if (item) {
          roomList = rand.shuffle(roomList);
          //console.log(roomList);
          let pickedRoom = null;
          for (const room of roomList) {
            if (room.autoSpawn & 16) {
              pickedRoom = room;
              break;
            }
          }
          total.push(item);
          if (pickedRoom) {
            if (!pickedRoom.extras) {pickedRoom.extras = []};
           // let list = [];
            ///for(const chooser of item.choosers) {
              //list.push(rand.getWeightedTable(chooser));
            //}
            pickedRoom.extras.push(item);
          }          
        }
      }      

      //const object = spawnSetPiece(setPiece);
    }
    return roomList;   
  }

  function addResource(roomList) { 
    let total = [];
    for (const resource of floorData.resources) {
      
      const num = rand.range(resource.min, resource.max+1);
      for (let i = 0; i < num; ++i) {
        const item = getWeightedItem(resource);

        if (item) {
          roomList = rand.shuffle(roomList);
          //console.log(roomList);
          let pickedRoom = null;
          for (const room of roomList) {
            if (room.autoSpawn & 16) {
              pickedRoom = room;
              break;
            }
          }
          total.push(item);
          if (pickedRoom) {
            if (!pickedRoom.resources) {pickedRoom.resources = []};
           // let list = [];
            ///for(const chooser of item.choosers) {
              //list.push(rand.getWeightedTable(chooser));
            //}
            pickedRoom.resources.push(item);
          }          
        }
      }      

      //const object = spawnSetPiece(setPiece);
    }
    return roomList;   
  }

  function crawlspace(roomList) {
    roomList = rand.shuffle(roomList);
    for (const room of roomList) {
      if (room.autoSpawn & 16) {
        console.log("Crawlspace: " + room.name)
        break
      }
    }
    return roomShuggle;
  }

  function getWeightedItem (object) {
    for(const item of object.items) {
        item.adjustedWeight = (!item.requirements  || item.requirements(flags)) ? item.weight : 0;          
    }
    const max = object.percent ? 100 : object.items.reduce((totalWeight, currentItem) => totalWeight + currentItem.adjustedWeight, 0);
    let randomPick = rand.rangeInclusive(1, max);
    for(const item of object.items) {
      randomPick -= item.adjustedWeight;
      if (randomPick <= 0) {
        return item;
      }
    }
    return null;
  }
}