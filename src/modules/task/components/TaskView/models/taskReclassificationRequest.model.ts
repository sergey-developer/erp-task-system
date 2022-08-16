import {
  ReclassificationReasonEnum,
  ReclassificationRequestStatusEnum,
  TaskCommentTypeEnum,
} from 'modules/task/constants/enums'
import { TaskAttachmentModel } from 'modules/task/models'
import { BaseUserModel } from 'modules/user/models'
import { CommentAuthorModel } from 'shared/interfaces/models'

export type TaskReclassificationRequestModel = {
  comment: {
    id: number
    attachments: Array<TaskAttachmentModel>
    author: CommentAuthorModel
    createdAt: string
    taskId: number
    text: string
    type: TaskCommentTypeEnum
  }
  id: number
  createdAt: string
  updatedAt: string
  externalComment: string
  externalId: string
  reclassificationReason: ReclassificationReasonEnum
  status: ReclassificationRequestStatusEnum
  task: number
  user: Omit<BaseUserModel, 'avatar'>
}
