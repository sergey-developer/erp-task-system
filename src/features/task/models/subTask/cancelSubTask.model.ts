import { CancelSubTaskFormFields } from 'features/task/components/CancelSubTaskModal/types'
import { RequestWithSubTask, RequestWithTask } from 'features/task/types'

import { FieldsErrors } from 'shared/api/baseApi'

export type CancelSubTaskRequest = RequestWithTask &
  RequestWithSubTask & {
    cancelReason: string
  }

export type CancelSubTaskResponse = void

export type CancelSubTaskBadRequestResponse = FieldsErrors<CancelSubTaskFormFields>
