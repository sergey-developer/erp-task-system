import {
  InfrastructureStatusHistoryTableItem,
  InfrastructureStatusHistoryTableProps,
} from 'features/infrastructures/components/InfrastructureStatusHistoryTable/types'
import { InfrastructureStatusEnum } from 'features/infrastructures/constants'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId } from '_tests_/utils'

export const tableRow: InfrastructureStatusHistoryTableItem = {
  id: fakeId(),
  status: InfrastructureStatusEnum.Suspended,
  createdBy: userFixtures.user(),
  createdAt: fakeDateString(),
}

export const props: Readonly<InfrastructureStatusHistoryTableProps> = {
  dataSource: [tableRow],
  loading: false,
}

export enum TestIdsEnum {
  Container = 'infrastructure-status-history-table',
}
