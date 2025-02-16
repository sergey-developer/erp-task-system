import { InfrastructureStatusEnum } from 'features/infrastructures/api/constants'
import {
  InfrastructureStatusHistoryTableItem,
  InfrastructureStatusHistoryTableProps,
} from 'features/infrastructures/components/InfrastructureStatusHistoryTable/types'

import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId } from '_tests_/helpers'

export const tableRow: InfrastructureStatusHistoryTableItem = {
  id: fakeId(),
  status: InfrastructureStatusEnum.Suspended,
  createdBy: userFixtures.userDetail(),
  createdAt: fakeDateString(),
}

export const props: Readonly<InfrastructureStatusHistoryTableProps> = {
  dataSource: [tableRow],
  loading: false,
}

export enum TestIdsEnum {
  Container = 'infrastructure-status-history-table',
}
