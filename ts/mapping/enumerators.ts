const enum direction {
  none = 0b0000,
  north = 0b0001,
  east = 0b0010,
  south = 0b0100,
  west = 0b1000,
  ne = 0b0011,
  ns = 0b0101,
  nw = 0b1001,
  nes = 0b0111,
  new = 0b1011,
  nsw = 0b1101,
  es = 0b0110,
  ew = 0b1010,
  esw = 0b1110,
  sw = 0b1100,
  block = 0b1111,
}
const cardinalDirections = [
  direction.north,
  direction.south,
  direction.east,
  direction.west,
]
function allowNeighbor(enc1, enc2) {
  if (enc1.noExit && enc2.noExit) {
    return (enc1.noExit | enc2.noExit) != direction.block; 
  }
  return true; 
}
function opposite(dir:direction) {
  return dir < direction.south ? dir << 2 : dir >> 2; 
}

const enum icon {
  none,
  start,
  boss,
  exit,
  relicOn,
  altarOn,
  relicAltar,
  secret,
  exclamation,
  shopBR,
  shop,
  combat,
  new,
  hoody,
  fountain,
  exlamation,
}

const enum door {
  none,
  normal,
  iron,
  rock,
  crystal,
  locked,
  secret,
  hidden,
}