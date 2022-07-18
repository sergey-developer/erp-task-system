import {
  ReclassificationReasonEnum,
  ReclassificationRequestStatusEnum,
} from 'modules/tasks/constants'

export type TaskReclassificationRequestModel = {
  id: number
  createdAt: string
  updatedAt: string
  reclassificationReason: ReclassificationReasonEnum
  textComment: string
  status: ReclassificationRequestStatusEnum
  task: number
}
