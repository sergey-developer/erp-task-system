import pick from 'lodash/pick'

import { UserPermissionsEnum } from 'modules/user/constants/index'
import { RelocationTaskDetailsProps } from 'modules/warehouse/components/RelocationTaskDetails/types'
import { RelocationTaskModel } from 'modules/warehouse/models/index'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'
import { fakeId } from '_tests_/utils'

export const props: RelocationTaskDetailsProps = {
  open: true,
  relocationTaskId: fakeId(),
  onClose: jest.fn(),
  refetchRelocationTasks: jest.fn(),
}

export const canExecuteRelocationTaskProps: {
  permissions: [UserPermissionsEnum.RelocationTasksUpdate]
  relocationTask: Pick<RelocationTaskModel, 'status' | 'executors' | 'completedBy'>
} = {
  relocationTask: pick(warehouseFixtures.relocationTask(), 'status', 'executors', 'completedBy'),
  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
}

export enum TestIdsEnum {
  RelocationTaskDetails = 'relocation-task-details',
  RelocationTaskDetailsLoading = 'relocation-task-details-loading',
}
