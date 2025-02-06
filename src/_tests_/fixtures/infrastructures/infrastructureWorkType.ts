import { InfrastructureWorkTypeDTO } from 'features/infrastructures/api/dto'
import { BudgetTypeEnum } from 'features/infrastructures/constants'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const infrastructureWorkType = (): InfrastructureWorkTypeDTO => ({
  id: fakeId(),
  title: fakeWord(),
  budgetType: BudgetTypeEnum.CAPEX,
  laborCosts: fakeInteger(),
})
