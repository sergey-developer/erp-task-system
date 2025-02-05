import * as supportGroup from './supportGroup'
import * as supportGroups from './supportGroups'

const supportGroupFixtures = {
  ...supportGroup,
  ...supportGroups,
} as const

export default supportGroupFixtures
