import { TaskTypeEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'

export type CreateTaskMutationArgs = {
  type: TaskTypeEnum
  olaNextBreachTime: string
  title: string
  description: string

  workGroup?: IdType
  assignee?: IdType
  isPrivate?: boolean
  attachments?: FileToSend[]
  coExecutors?: IdType
  observers?: IdType
  workType?: IdType
  customer?: IdType
  contactType?: string
  email?: string
  shopId?: IdType
  address?: string
}

export type CreateTaskSuccessResponse = { id: IdType }
