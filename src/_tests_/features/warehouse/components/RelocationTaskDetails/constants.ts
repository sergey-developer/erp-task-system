import { RelocationTaskDetailsProps } from 'features/relocationTasks/components/RelocationTaskDetails/types'
import { UserPermissionsEnum } from 'features/users/api/constants/index'
import { RelocationTaskDetailDTO } from 'features/warehouses/api/dto/index'
import pick from 'lodash/pick'

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
  relocationTask: Pick<RelocationTaskDetailDTO, 'status' | 'executors' | 'completedBy'>
} = {
  relocationTask: pick(warehouseFixtures.relocationTask(), 'status', 'executors', 'completedBy'),
  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
}

export enum TestIdsEnum {
  RelocationTaskDetails = 'relocation-task-details',
  RelocationTaskDetailsLoading = 'relocation-task-details-loading',
}
