import { ChangeInfrastructureOrderFormTableProps } from 'modules/infrastructures/components/ChangeInfrastructureOrderFormTable/types'

import { fakeWord } from '_tests_/utils'

export const props: ChangeInfrastructureOrderFormTableProps = {
  name: fakeWord(),

  editableKeys: [],
  onChange: jest.fn(),

  infrastructureWorkTypes: [],

  managerIsCurrentUser: true,

  onChangeWorkType: jest.fn(),
  onChangeAmount: jest.fn(),
}

export enum TestIdsEnum {
  ChangeInfrastructureOrderFormTableContainer = 'change-infrastructure-order-form-table-container',
}
