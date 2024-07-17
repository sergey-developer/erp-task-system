import * as infrastructure from './infrastructure'
import * as infrastructureOrdersForms from './infrastructureOrdersForms'
import * as infrastructureStatusHistory from './infrastructureStatusHistory'
import * as infrastructureWork from './infrastructureWork'
import * as infrastructureWorkType from './infrastructureWorkType'
import * as urgencyRateType from './urgencyRateType'

const infrastructuresFixtures = {
  ...infrastructure,
  ...infrastructureWork,
  ...infrastructureWorkType,
  ...infrastructureOrdersForms,
  ...infrastructureStatusHistory,
  ...urgencyRateType,
} as const

export default infrastructuresFixtures
