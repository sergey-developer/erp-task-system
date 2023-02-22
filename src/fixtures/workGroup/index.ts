import * as workGroup from './workGroup'
import * as workGroupList from './workGroupList'

const workGroupFixtures = {
  ...workGroup,
  ...workGroupList,
} as const

export default workGroupFixtures
