import { InfrastructureDTO } from 'features/infrastructures/api/dto'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/task/constants/task'
import {
  SuspendRequestModel,
  TaskAssigneeModel,
  TaskAttachmentsModel,
  TaskResponseTimeModel,
  TaskSupportGroupModel,
  TaskWorkGroupModel,
} from 'features/task/models'
import { UserDetailDTO, UserPositionDTO } from 'features/users/api/dto'
import { WorkTypeDetailDTO } from 'features/warehouse/models'

import { SystemEnum } from 'shared/constants/enums'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskModel = {
  id: IdType
  system: SystemEnum
  createdAt: string
  type: TaskTypeEnum
  contactService: string
  recordId: string
  status: TaskStatusEnum
  title: string
  olaNextBreachTime: string

  initialImpact: MaybeNull<1 | 2 | 3 | 4>
  severity: MaybeNull<1 | 2 | 3 | 4>
  priorityCode: MaybeNull<1 | 2 | 3 | 4>
  productClassifier1: MaybeNull<string>
  productClassifier2: MaybeNull<string>
  productClassifier3: MaybeNull<string>
  observers: MaybeNull<
    Array<
      Pick<UserDetailDTO, 'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'> & {
        position: MaybeNull<UserPositionDTO['title']>
      }
    >
  >
  createdBy: MaybeNull<
    Pick<UserDetailDTO, 'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'> & {
      position: MaybeNull<UserPositionDTO['title']>
    }
  >
  parentTask: MaybeNull<Pick<TaskModel, 'id' | 'recordId'>>
  name: MaybeNull<string>
  olaStatus: MaybeNull<TaskOlaStatusEnum>
  extendedStatus: MaybeNull<TaskExtendedStatusEnum>
  workGroup: MaybeNull<TaskWorkGroupModel>
  assignee: MaybeNull<TaskAssigneeModel>
  responseTime: MaybeNull<Pick<TaskResponseTimeModel, 'progress' | 'timedelta' | 'value'>>
  contactPhone: MaybeNull<string>
  portablePhone: MaybeNull<string>
  description: MaybeNull<string>
  techResolution: MaybeNull<string>
  userResolution: MaybeNull<string>
  address: MaybeNull<string>
  latitude: MaybeNull<string>
  longitude: MaybeNull<string>
  parentInteractionExternalId: MaybeNull<string>
  olaEstimatedTime: number
  workType: MaybeNull<Pick<WorkTypeDetailDTO, 'id' | 'title' | 'actions'>>
  isOlaNextBreachTimeChanged: MaybeNull<boolean>
  previousOlaNextBreachTime: MaybeNull<string>
  resolution: { attachments: TaskAttachmentsModel }
  hasRelocationTasks: boolean
  previousDescription: MaybeNull<string>
  isDescriptionChanged: MaybeNull<boolean>
  attachments: MaybeNull<TaskAttachmentsModel>
  suspendRequest: MaybeNull<SuspendRequestModel>
  weight: MaybeNull<number>
  company: MaybeNull<string>
  email: MaybeNull<string>
  sapId: MaybeNull<string>
  contactType: MaybeNull<string>
  shop: MaybeNull<{
    id: IdType
    title: string
  }>
  fiscalAccumulator: MaybeNull<{
    isRequestSent: MaybeNull<boolean>
    isRequestApproved: MaybeNull<boolean>
  }>
  supportGroup: MaybeNull<TaskSupportGroupModel>
  infrastructureProject: MaybeNull<InfrastructureDTO>
}
