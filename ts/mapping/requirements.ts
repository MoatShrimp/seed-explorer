const requirements = {
  hasWhip: (flag) => flag.hasWhip ?? false,
  hasHat: (flag) => flag.hasHat ?? false,
  storyNotWhip: (flag) => (!flag.whip_enabled && flag.storyMode) ?? false,
}