import { ChangeInfrastructureOrderFormTableProps } from 'modules/infrastructures/components/ChangeInfrastructureOrderFormTable/types'

import { fakeWord } from '_tests_/utils'

export const props: ChangeInfrastructureOrderFormTableProps = {
  editableKeys: [],
  name: fakeWord(),

  infrastructureWorkTypes: [],

  managerIsCurrentUser: true,
}

export enum TestIdsEnum {
  ChangeInfrastructureOrderFormTableContainer = 'change-infrastructure-order-form-table-container',
}
