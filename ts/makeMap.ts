function mapMaker(roomList:room[]) {

    const   none = 0,
            north = 1,
            south = 2,
            east = 4,
            west = 8;

    const cardinalDirections = [
        north,
        south,
        east,
        west  
    ]

    function opposit(direction:number) {
        switch(direction) {
            case north:
                return south;
            case south:
                return north;
            case east:
                return west;
            case west:
                return east;
            default:
                return none;
        }
    }

    function allowNeighborInDirection(room:room, direction:number) {
        return (room.prohibitedExits & direction) == none;
    }

    function allowLink(room:room, neighbor:room, direction:number) {
        return  (room.prohibitedExits & direction) == none && (neighbor.prohibitedExits & opposit(direction)) == none;
    }

    function allowNeighbor(room:room, neighbor:room) {
        return  allowLink(room, neighbor, north) ||
                allowLink(room, neighbor, south) ||
                allowLink(room, neighbor, east) ||
                allowLink(room, neighbor, west);
    }

    function isValidNeighbor(room:room, neighbor:room, direction:number) {
        return (direction == none) ? allowNeighbor(room, neighbor) : allowLink(room, neighbor, direction);
    }
    
    function getRoomPosition(oldPosition:position, direction:number) {
        switch (direction) {
            case north:
                --oldPosition.y;
                break;
            case south:
                ++oldPosition.y;
                break;
            case east:
                ++oldPosition.x;
                break;
            case west:
                --oldPosition.x;
                break;
        }
        return oldPosition;
    }

    function getRoom(position:position) {
        for (const room of roomList) {
            if (room.position == position) {
                return room;
            }
        }
        return null;
    }

    function getDirectionInt(str:string) {
        switch (str){
            case "north":
                return north;
            case "south":
                return south;
            case "east":
                return east;
            case "west":
                return west;
            default:
                return none;
        }
    }
    
    function canMove(room:room, direction:number, roomPosition:position) {

        if (room.previousRoom && !isValidNeighbor(room, room.previousRoom, direction)) {
            return false;
        }

        roomPosition = getRoomPosition(roomPosition, direction);
        const room2 = getRoom(roomPosition);

        if (room2 == null) {

            let num = 0;
            for (const [key, value] of Object.entries(room.branches)) {

                const pickedDirection = getDirectionInt(key);
                if (pickedDirection != none) {

                    if (canMove(value, pickedDirection, roomPosition)) {
                        ++num;
                    }
                    else {
                        for (const direction2 of cardinalDirections) {

                            if (canMove(value, direction2, roomPosition)) {
                                ++num;
                                break;
                            }
                        }
                    }
                }
            }

            return num == Object.keys(room.branches).length;
        }

        return false;
    }

    function setRoomPosition(room:room) {

        let list = [
            north,
            south,
            east,
            west  
        ]

        let direction = none;

        if (room.previousRoom){

            room.position = room.previousRoom.position;
            direction = room.direction ?? none;

            if (direction != none) {

                if (canMove(room, direction, room.position)) {
                    room.position = getRoomPosition(room.position, direction);
                }
                direction = none;
            }
            else {

                
            }

        }
        return true;
    }




    const startingRoom = roomList[0];
    let positionedRooms = [];
    let num2;
    for (let i = 0; i < 10; i = num2){

        for(const room of roomList) {
            room.neighbours = null;
        }
        positionedRooms = [];
        positionedRooms.push(startingRoom);
        let num = 1;

        while(num < positionedRooms.length && setRoomPosition(roomList[num]))
        {}

    }
}