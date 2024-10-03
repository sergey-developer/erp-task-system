import { ChangeInfrastructureOrderFormTableProps } from 'modules/infrastructures/components/ChangeInfrastructureOrderFormTable/types'

import { fakeWord } from '_tests_/utils'

export const props: ChangeInfrastructureOrderFormTableProps = {
  name: fakeWord(),

  editableKeys: undefined,
  onChange: jest.fn(),

  infrastructureWorkTypes: [],

  managerIsCurrentUser: true,

  onClickDeleteInfrastructureWorkType: jest.fn(),
}

export enum TestIdsEnum {
  ChangeInfrastructureOrderFormTableContainer = 'change-infrastructure-order-form-table-container',
}
