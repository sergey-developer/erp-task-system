import {
  ReclassificationReasonEnum,
  ReclassificationRequestStatusEnum,
} from 'modules/task/constants/enums'

export type TaskReclassificationRequestModel = {
  id: number
  createdAt: string
  updatedAt: string
  reclassificationReason: ReclassificationReasonEnum
  task: number
  status: ReclassificationRequestStatusEnum
  externalComment?: string
  externalId?: string
}
