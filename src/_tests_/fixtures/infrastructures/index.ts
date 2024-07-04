import * as infrastructure from './infrastructure'
import * as infrastructureOrdersForms from './infrastructureOrdersForms'
import * as infrastructureStatusHistory from './infrastructureStatusHistory'
import * as urgencyRateType from './urgencyRateType'

const infrastructuresFixtures = {
  ...infrastructure,
  ...infrastructureOrdersForms,
  ...infrastructureStatusHistory,
  ...urgencyRateType,
} as const

export default infrastructuresFixtures
