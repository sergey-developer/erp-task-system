import { CancelSubTaskFormFields } from 'features/tasks/components/CancelSubTaskModal/types'
import { RequestWithSubTask, RequestWithTask } from 'features/tasks/api/types'

import { FieldsErrors } from 'shared/api/baseApi'

export type CancelSubTaskRequest = RequestWithTask &
  RequestWithSubTask & {
    cancelReason: string
  }

export type CancelSubTaskResponse = void

export type CancelSubTaskBadRequestResponse = FieldsErrors<CancelSubTaskFormFields>
