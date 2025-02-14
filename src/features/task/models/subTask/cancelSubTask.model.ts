import { CancelSubTaskFormFields } from 'features/task/components/CancelSubTaskModal/types'
import { SubTaskRequestArgs, TaskRequestArgs } from 'features/task/types'

import { FieldsErrors } from 'shared/api/baseApi'

export type CancelSubTaskRequest = TaskRequestArgs &
  SubTaskRequestArgs & {
    cancelReason: string
  }

export type CancelSubTaskResponse = void

export type CancelSubTaskBadRequestErrorResponse = FieldsErrors<CancelSubTaskFormFields>
