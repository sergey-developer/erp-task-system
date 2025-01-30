import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type CreateTaskRegistrationFNRequestMutationArgs = TaskRequestArgs & {
  changeType: IdType
  attachments: IdType[]
}

export type CreateTaskRegistrationFNRequestSuccessResponse = void
