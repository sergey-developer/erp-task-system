import {
  ReclassificationReasonEnum,
  ReclassificationRequestStatusEnum,
} from 'modules/task/constants/common'

export type BaseTaskReclassificationRequestModel = {
  id: number
  createdAt: string
  updatedAt: string
  reclassificationReason: ReclassificationReasonEnum
  status: ReclassificationRequestStatusEnum
  task: number
  externalId?: string
  externalComment?: string
}
