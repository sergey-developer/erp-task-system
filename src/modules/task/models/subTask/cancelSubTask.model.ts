import { CancelSubTaskFormFields } from 'modules/task/components/CancelSubTaskModal/types'
import { SubTaskRequestArgs, TaskRequestArgs } from 'modules/task/types'

import { FieldsErrors } from 'shared/services/baseApi'

export type CancelSubTaskMutationArgs = TaskRequestArgs &
  SubTaskRequestArgs & {
    cancelReason: string
  }

export type CancelSubTaskSuccessResponse = void

export type CancelSubTaskBadRequestErrorResponse = FieldsErrors<CancelSubTaskFormFields>
