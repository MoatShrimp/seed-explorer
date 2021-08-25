function getFloorData(floor:number, flags) {
  if (floor < 1 || floor > 20) {floor = 1};
  const zoneNumber = Math.trunc((floor-1)/4);
  const zoneIndex = (floor-1)%4;
  const zone = zoneData[zoneNumber];
  for (const z of zone) {
    if (z.requirements(flags)) {

      const override = z.floors[zoneIndex].override ?? null;
      return {
        name: `${z.name}-${zoneIndex+1}`,
        index: zoneIndex,
        map: override?.map ?? z.map,
        connectivity: override?.connectivity ?? z.connectivity,
        zoneNumber: z.zoneNumber,
        floor: z.startFloor + zoneIndex,
        difficulty: override?.difficulty ?? z.baseDifficulty + (z.difficultyStep*(zoneIndex)),
        enemyTypeWeight: override?.enemyTypeWeight ?? z.enemyTypeWeight,
        enemies: z.floors[zoneIndex].enemies,
        setPieces: z.setPieces ?? null,
        extras: z.extras ?? null,
        resources: z.resources ?? null,
      }
    }
  }
  return null;
}