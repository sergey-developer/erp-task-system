import { BudgetTypeEnum } from 'features/infrastructures/constants'
import { InfrastructureWorkTypeModel } from 'features/infrastructures/models'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const infrastructureWorkType = (): InfrastructureWorkTypeModel => ({
  id: fakeId(),
  title: fakeWord(),
  budgetType: BudgetTypeEnum.CAPEX,
  laborCosts: fakeInteger(),
})
