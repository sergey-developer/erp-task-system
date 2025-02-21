import { TaskTypeEnum } from 'features/tasks/api/constants'

import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'

export type CreateTaskRequest = {
  olaNextBreachTime: string
  title: string
  description: string

  type?: TaskTypeEnum
  workGroup?: IdType
  assignee?: IdType
  isPrivate?: boolean
  attachments?: FileToSend[]
  coExecutors?: IdType[]
  observers?: IdType[]
  workType?: IdType
  customer?: IdType
  contactType?: string
  email?: string
  shopId?: IdType
  address?: string
  parentTask?: IdType
}

export type CreateTaskResponse = { id: IdType }
