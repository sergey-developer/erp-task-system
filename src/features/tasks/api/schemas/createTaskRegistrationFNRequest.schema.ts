import { RequestWithTask } from 'features/tasks/api/types'

import { IdType } from 'shared/types/common'

export type CreateTaskRegistrationFNRequestRequest = RequestWithTask & {
  changeType: IdType
  attachments: IdType[]
}

export type CreateTaskRegistrationFNRequestResponse = void
