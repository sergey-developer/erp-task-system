import { BudgetTypeEnum } from 'modules/infrastructures/constants'
import { InfrastructureWorkTypeModel } from 'modules/infrastructures/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const infrastructureWorkType = (): InfrastructureWorkTypeModel => ({
  id: fakeId(),
  title: fakeWord(),
  budgetType: BudgetTypeEnum.CAPEX,
})
