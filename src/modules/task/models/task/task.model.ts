import { InfrastructureModel } from 'modules/infrastructures/models'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'
import {
  SuspendRequestModel,
  TaskAssigneeModel,
  TaskAttachmentListModel,
  TaskResponseTimeModel,
  TaskSupportGroupModel,
  TaskWorkGroupModel,
} from 'modules/task/models'
import { UserModel, UserPositionModel } from 'modules/user/models'
import { WorkTypeModel } from 'modules/warehouse/models'

import { SystemEnum } from 'shared/constants/enums'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskModel = {
  id: IdType
  createdAt: string
  type: TaskTypeEnum
  contactService: string
  recordId: string
  status: TaskStatusEnum
  title: string
  olaNextBreachTime: string
  system: SystemEnum

  initialImpact: MaybeNull<1 | 2 | 3 | 4>
  severity: MaybeNull<1 | 2 | 3 | 4>
  priorityCode: MaybeNull<1 | 2 | 3 | 4>
  productClassifier1: MaybeNull<string>
  productClassifier2: MaybeNull<string>
  productClassifier3: MaybeNull<string>
  observers: MaybeNull<
    Array<
      Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'> & {
        position: MaybeNull<UserPositionModel['title']>
      }
    >
  >
  createdBy: MaybeNull<
    Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'> & {
      position: MaybeNull<UserPositionModel['title']>
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
  workType: MaybeNull<Pick<WorkTypeModel, 'id' | 'title' | 'actions'>>
  isOlaNextBreachTimeChanged: MaybeNull<boolean>
  previousOlaNextBreachTime: MaybeNull<string>
  resolution: { attachments: TaskAttachmentListModel }
  hasRelocationTasks: boolean
  previousDescription: MaybeNull<string>
  isDescriptionChanged: MaybeNull<boolean>
  attachments: MaybeNull<TaskAttachmentListModel>
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
  infrastructureProject: MaybeNull<InfrastructureModel>
}
