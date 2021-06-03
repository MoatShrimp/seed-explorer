function mapMaker(roomList:room[]) {

    //binary flags for direcitons
    const none =  0b0000;
    const north = 0b0001;
    const south = 0b0010; 
    const east =  0b0100;
    const west =  0b1000;

    const cardinalDirections = [north, south, east, west]

    function opposite (direction:number) {
        switch (direction) {
            case north: return south;
            case south: return north;
            case east: return west;
            case west: return east;
            default: return none;
        }
    }

    //functions to verify that two rooms can be connected
    function validDirection(room:room, neighbor:room, direction:number) {
        return !(room.prohibitedExits & direction) && !(neighbor.prohibitedExits & opposite(direction));
    }

    function allowNeighbor(room:room, neighbor:room) {        
        const checkLink = (direction:number) => validDirection(room, neighbor, direction);
        return checkLink(north) || checkLink(south) || checkLink(east) || checkLink(west);
    }

    function isValidNeighbor(room:room, neighbor:room, direction:number) {
        return !(direction) ? allowNeighbor(room, neighbor) : validDirection(room, neighbor, direction);
    }

    //position functions
    function newPosition(room:room, direction:number) {
        const [xPos, yPos] = [room.position.x, room.position.y];
        switch (direction) {
            case north: return {x:xPos, y:yPos-1}
            case south: return {x:xPos, y:yPos+1}
            case east: return {x:xPos+1, y:yPos}
            case west: return {x:xPos-1, y:yPos}
            default: return {x:xPos, y:yPos}
        }
    }

    function getRoomInPos(position:position) {
        const [xPos, yPos] = [position.x, position.y];
        for (const room of roomList) {
            if (room.position.x == xPos && room.position.y == yPos) return room;
        }
        return null; //if no room is found
    }
    
    function canMove(room:room, direction:number) {
        if (room.previousRoom && !isValidNeighbor(room, room.previousRoom, direction)) return false;
        else if (getRoomInPos(newPosition(room, direction)) == null) return true;
        else return false;
    }

    function setRoomPosition(room:room) {
        
        let list = [...cardinalDirections];
        let direction = room.direction ?? none;

        while (true) {//substitute for goto IL_229;
            if (room.previousRoom) {
                room.position = room.previousRoom.position;
                if (direction) {                    
                    if (canMove(room, direction)) {
                        room.position = newPosition(room, direction);
                        break;//goto IL_229;
                    }
                    direction = none;
                    break;//goto IL_229;
                }
                else {
                    list = rand.layout.shuffle(list);
                    for (const direction2 of list) {
                        if(canMove(room, direction2)) {
                            direction = direction2;
                            room.position = newPosition(room, direction);
                            break;
                        }
                    }
                    break;//goto IL_229;      
                }
            }

            let list2 = [...positionedRooms];
            if (room.doorType == "none" || room.doorType == "hidden") {

                list2 = rand.layout.shuffle(list2);

                for (const room2 of list2) {
                    room.position = room2.position;
                    list = rand.layout.shuffle(list);
                    for (const direction3 of list) {

                        if (canMove(room, direction3) ){

                            direction = direction3;
                            room.position = newPosition(room, direction);
                            break;
                        }
                    }
                    if (direction != none) {
                        break; 
                    }
                }
                break;//goto IL_229; 
            }
            
            list2 = list2.filter(room => room.weight);
            while(!direction && list2.length > 0) {

                let room3:room = null;
                if (room3 = rand.layout.getWeightedTable(list2)){

                    room.position = room3.position;
                    list = rand.layout.shuffle(list);

                    for (const direction4 of list) {

                        if (isValidNeighbor(room3, room, direction4) && canMove(room, direction4)) {

                            direction = direction4;
                            room.position = newPosition(room, direction);
                            break;
                        }
                    }
                    list2 = list2.filter(current => current != room3);
                }
            }
            break;
        }
        //IL_229; 
        if (direction) {

            if (room.doorType != "none" && room.doorType != "hidden") {

                let direction5 = opposite(direction);
                let room4 = getRoomInPos(newPosition(room, direction5));
                if (room4 != null) {

                    room4.neighbours[direction] = room;
                    room.neighbours[direction5] = room4;
                }
            }
            return true;
        }
        return false;
    }

    const startingRoom = roomList[0];
    let positionedRooms:room[] = [];
    let num2;

    for (const room11 of roomList) {
        room11.position = {x:0, y:0};
        room11.branches = null;
    }
    for (let i = 0; i < 10; i = num2){

        for(const room of roomList) {
            room.neighbours = [];
        }
        positionedRooms = [];
        positionedRooms.push(startingRoom);
        let num = 1;
        
        while(num < roomList.length && setRoomPosition(roomList[num])) {
            positionedRooms.push(roomList[num]);
                ++num;
        }
        
        if(positionedRooms.length == roomList.length) {
            let outArray = [];
            for (const room of positionedRooms) {
                outArray.push([room.roomName, room.position.x, room.position.y, room.neighbours])
            }
            return outArray;
            //return positionedRooms;
        }
        console.log(`%cLayout failed, trying again!`, "color:#a00;");
        for (let room13 of roomList) {
            room13.position = {x:0, y:0};
        }
        num2 = i + 1;
    }
}