import * as supportGroup from './supportGroup'
import * as supportGroupList from './supportGroupList'

const supportGroupFixtures = {
  ...supportGroup,
  ...supportGroupList,
} as const

export default supportGroupFixtures
