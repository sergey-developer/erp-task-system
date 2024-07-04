import * as infrastructure from './infrastructure.model'
import * as infrastructureStatusHistory from './infrastructureStatusHistory.model'

const infrastructuresFixtures = {
  ...infrastructure,
  ...infrastructureStatusHistory,
} as const

export default infrastructuresFixtures
