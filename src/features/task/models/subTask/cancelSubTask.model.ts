import { CancelSubTaskFormFields } from 'features/task/components/CancelSubTaskModal/types'
import { SubTaskRequestArgs, TaskRequestArgs } from 'features/task/types'

import { FieldsErrors } from 'shared/api/services/baseApi'

export type CancelSubTaskMutationArgs = TaskRequestArgs &
  SubTaskRequestArgs & {
    cancelReason: string
  }

export type CancelSubTaskSuccessResponse = void

export type CancelSubTaskBadRequestErrorResponse = FieldsErrors<CancelSubTaskFormFields>
