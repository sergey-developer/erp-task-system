import { RequestWithTask } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type CreateTaskRegistrationFNRequestRequest = RequestWithTask & {
  changeType: IdType
  attachments: IdType[]
}

export type CreateTaskRegistrationFNRequestResponse = void
