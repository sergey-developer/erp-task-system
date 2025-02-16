import { BudgetTypeEnum } from 'features/infrastructures/api/constants'
import { InfrastructureWorkTypeDTO } from 'features/infrastructures/api/dto'

import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

export const infrastructureWorkType = (): InfrastructureWorkTypeDTO => ({
  id: fakeId(),
  title: fakeWord(),
  budgetType: BudgetTypeEnum.CAPEX,
  laborCosts: fakeInteger(),
})
