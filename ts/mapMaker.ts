function mapMaker(roomList:room[]) {

    //binary flags for direcitons
    const none =  0b0000;
    const north = 0b0001;
    const south = 0b0010; 
    const east =  0b0100;
    const west =  0b1000;
    const cardinalDirections = [north, south, east, west];
    //bitshift for reversing directions
    const opposite = (direction:number) => (direction & (north + east)) ? direction << 1 : direction >>> 1;
    //array for placed rooms, using entrance as the first room
    const startingRoom = roomList[0];
    let positionedRooms:room[] = [];    

    //Main loop, tries 10 different layouts for the floor
    for (let trial = 0; trial < 10; ++trial ){

        roomList.forEach(room => {
            room.neighbours = [];
            room.position = {x:0, y:0};
            room.binMap = none;
        });

        positionedRooms = [startingRoom];        
        roomList.slice(1).forEach(room => { //skipping the first room
            if (setRoomPosition(room)) {
                positionedRooms.push(room);
            }
        });
        
        if (positionedRooms.length === roomList.length) {
            positionedRooms = movePosOrigo(positionedRooms);
            console.table(getNeigbours(positionedRooms));
            //return positionedRooms.map(room => [room.roomName, room.position.x, room.position.y, room.neighbours]);
            const outArray = positionedRooms.map(room => [room.roomName, room.position.x, room.position.y, room.binMap]);
            //console.table(positionedRooms, ["roomName", "position", "binMap"]);
            return outArray;
        }
        else {
            console.log(`%cLayout failed, trying again!`, "color:#a00;");
        }
    }

    //Main method for finding an available locaiton for the room
    function setRoomPosition(room:room) {
        
        let direction = room.direction ?? none;

        if (room.previousRoom) {
            room.position = room.previousRoom.position;

            if (direction) {    
                if (canMove(room, direction)) {
                    room.position = newPosition(room.position, direction);
                }
                else {
                    direction = none;
                }
            }

            else {
                for (const newDirection of rand.layout.shuffle(cardinalDirections)) {
                    if(canMove(room, newDirection)) {
                        direction = newDirection;
                        room.position = newPosition(room.position, direction);
                        break;
                    }
                } 
            }
        }

        else if (room.doorType === "none" || room.doorType === "hidden") {

            for (const startRoom of rand.layout.shuffle(positionedRooms)) {
                room.position = startRoom.position;

                for (const newDirection of rand.layout.shuffle(cardinalDirections)) {
                    if (canMove(room, newDirection) ){
                        direction = newDirection;
                        room.position = newPosition(room.position, direction);
                        break;
                    }
                }

                if (direction) {
                    break; 
                }
            }
        }
        
        else {
            let weightedRooms = positionedRooms.filter(room => room.weight);
            
            while(!direction && weightedRooms.length > 0) {
                let startRoom:room = null;

                if (startRoom = rand.layout.getWeightedTable(weightedRooms)){
                    room.position = startRoom.position;

                    for (const newDirection of rand.layout.shuffle(cardinalDirections)) {
                        if (isValidNeighbor(startRoom, room, newDirection) && canMove(room, newDirection)) {
                            direction = newDirection;
                            room.position = newPosition(room.position, direction);
                            break;
                        }
                    }

                    weightedRooms = weightedRooms.filter(current => current != startRoom);
                }
            }
        }

        if (direction) {

            if (room.doorType != "none" && room.doorType != "hidden") {
                let opposingDirection = opposite(direction);
                let opposingRoom = getRoomInPos(newPosition(room.position, opposingDirection));

                if (opposingRoom != null) {
                    opposingRoom.neighbours[direction] = room;
                    room.neighbours[opposingDirection] = opposingRoom;                
                }
            }

            return true;            
        }
        
        return false;

        //helpers
        function canMove(room:room, direction:number) {
            if (room.previousRoom && !isValidNeighbor(room, room.previousRoom, direction)) return false;
            else if (!getRoomInPos(newPosition(room.position, direction))) return true;
            else return false;
        }
    
        function getRoomInPos(pos:position) {
            return roomList.find(room => (room.position.x === pos.x && room.position.y === pos.y));
        }    
    
        //verify that two rooms can be connected
        function isValidNeighbor(room:room, neighbor:room, direction:number) {            
            return !(direction) ? allowNeighbor(room, neighbor) : validDirection(room, neighbor, direction);
    
            //helpers
            function allowNeighbor(room:room, neighbor:room) {        
                const checkLink = (direction:number) => validDirection(room, neighbor, direction);
                return checkLink(north) || checkLink(south) || checkLink(east) || checkLink(west);
            }
            
            function validDirection(room:room, neighbor:room, direction:number) {
                return !(room.prohibitedExits & direction) && !(neighbor.prohibitedExits & opposite(direction));
            }       
        }
    
        function newPosition(position:position, direction:number) {
            const [xPos, yPos] = [position.x, position.y];
            switch (direction) {
                case north: return {x:xPos, y:yPos-1}
                case south: return {x:xPos, y:yPos+1}
                case east: return {x:xPos+1, y:yPos}
                case west: return {x:xPos-1, y:yPos}
                default: return {x:xPos, y:yPos}
            }
        }  
    }
    
    //moving the origo to the top left
    function movePosOrigo (rooms:room[]) {
        const xMin = rooms.reduce((min, current) => min = Math.min(min, current.position.x), 0);
        const yMin = rooms.reduce((min, current) => min = Math.min(min, current.position.y), 0);

        rooms.forEach(room => room.position = {x:(room.position.x-xMin), y:(room.position.y-yMin)});
        return rooms;
    }

    function getNeigbours (rooms:room[]) {
        let binaryMap:room[][] = Array.from(Array(10), () => new Array());

        rooms.forEach(room => binaryMap[room.position.y][room.position.x] = room;
        
        for (const room of rooms) {
            const [xPos, yPos] = [room.position.x, room.position.y];
            if (yPos && !(room.binMap & north) && (binaryMap[yPos-1][xPos])) room.binMap += north;
            if (!(room.binMap & south) && (binaryMap[yPos+1][xPos])) room.binMap += south;
            if (!(room.binMap & east) && (binaryMap[yPos][xPos+1])) room.binMap += east;
            if (xPos && !(room.binMap & west) && (binaryMap[yPos][xPos-1])) room.binMap += west;
        }

        return binaryMap;       
    }
}