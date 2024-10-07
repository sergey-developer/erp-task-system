import { ChangeInfrastructureOrderFormTableProps } from 'modules/infrastructures/components/ChangeInfrastructureOrderFormTable/types'

import { fakeWord } from '_tests_/utils'

export const props: ChangeInfrastructureOrderFormTableProps = {
  name: fakeWord(),

  editableKeys: undefined,
  onChange: jest.fn(),

  infrastructureWorkTypes: [],

  createWorkIsLoading: false,
  updateWorkIsLoading: false,

  managerIsCurrentUser: true,

  onChangeWorkType: jest.fn(),
  infrastructureOrderFormWorkTypeCostIsFetching: false,
  onChangeAmount: jest.fn(),
}

export enum TestIdsEnum {
  ChangeInfrastructureOrderFormTableContainer = 'change-infrastructure-order-form-table-container',
  NameFormItem = 'name-form-item',
  BudgetTypeFormItem = 'budget-type-form-item',
  LaborCostsFormItem = 'labor-costs-form-item',
  AmountFormItem = 'amount-form-item',
  CostFormItem = 'cost-form-item',
  PriceFormItem = 'price-form-item',
}
