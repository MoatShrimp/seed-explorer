const requirements = {
  hasWhip: (flag) => flag.hasWhip ?? false,
  hasHat: (flag) => flag.hasHat ?? false,
  storyNotWhip: (flag) => (!flag.whip_enabled && flag.storyMode) ?? false,
  priestessRescued: (flag) => (flag.priestess_met > 2) ?? false,
}