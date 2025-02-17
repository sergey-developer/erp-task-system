import { RelocationTaskDetailDTO } from 'features/relocationTasks/api/dto'
import { RelocationTaskDetailsProps } from 'features/relocationTasks/components/RelocationTaskDetails/types'
import { UserPermissionsEnum } from 'features/users/api/constants/index'
import pick from 'lodash/pick'

import warehousesFixtures from '_tests_/fixtures/warehouse/index'
import { fakeId } from '_tests_/helpers'

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
  relocationTask: pick(warehousesFixtures.relocationTask(), 'status', 'executors', 'completedBy'),
  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
}

export enum TestIdsEnum {
  RelocationTaskDetails = 'relocation-task-details',
  RelocationTaskDetailsLoading = 'relocation-task-details-loading',
}
