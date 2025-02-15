import { TaskDetailsProps } from 'features/tasks/components/TaskDetails/index'
import { TaskDetailDTO } from 'features/tasks/models/index'
import { UserPermissionsEnum } from 'features/users/api/constants/index'
import { WorkTypeActionsEnum } from 'features/warehouses/constants/workType/index'

import infrastructuresFixtures from '_tests_/fixtures/infrastructures/index'
import warehouseFixtures from '_tests_/fixtures/warehouse/index'
import { fakeId } from '_tests_/utils'

export const props: TaskDetailsProps = {
  taskId: fakeId(),

  additionalInfoExpanded: false,
  onExpandAdditionalInfo: jest.fn(),

  activeTab: undefined,
  onClose: jest.fn(),
}

export const showChangeInfrastructureButton: {
  task: Pick<TaskDetailDTO, 'infrastructureProject' | 'workType'>
} = {
  task: {
    workType: warehouseFixtures.workType({
      actions: [WorkTypeActionsEnum.CreateInfrastructureProject],
    }),
    infrastructureProject: infrastructuresFixtures.infrastructure(),
  },
}

export const activeChangeInfrastructureButton: { permissions: UserPermissionsEnum[] } = {
  permissions: [
    UserPermissionsEnum.InfrastructureProjectRead,
    UserPermissionsEnum.AnyStatusInfrastructureProjectRead,
  ],
}

export enum TestIdsEnum {
  TaskDetails = 'task-details',
  SupportManagerBlock = 'support-manager-block',
}
