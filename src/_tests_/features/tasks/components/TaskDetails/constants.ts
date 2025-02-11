import { TaskDetailsProps } from 'features/task/components/TaskDetails/index'
import { TaskModel } from 'features/task/models/index'
import { UserPermissionsEnum } from 'features/users/api/constants/index'
import { WorkTypeActionsEnum } from 'features/warehouse/constants/workType/index'

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
  task: Pick<TaskModel, 'infrastructureProject' | 'workType'>
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
