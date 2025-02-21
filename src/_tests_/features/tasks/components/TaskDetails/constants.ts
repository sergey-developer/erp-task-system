import { TaskDetailDTO } from 'features/tasks/api/dto'
import { TaskDetailsProps } from 'features/tasks/components/TaskDetails/index'
import { UserPermissionsEnum } from 'features/users/api/constants/index'

import { WorkTypeActionsEnum } from 'shared/catalogs/workTypes/api/constants'

import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import infrastructuresFixtures from '_tests_/fixtures/api/data/infrastructures/index'
import { fakeId } from '_tests_/helpers'

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
    workType: catalogsFixtures.workTypeDetail({
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
