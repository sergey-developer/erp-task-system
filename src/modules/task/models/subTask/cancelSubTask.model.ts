import { CancelSubTaskFormFields } from 'modules/task/components/CancelSubTaskModal/types'
import { BaseSubTaskRequestArgs } from 'modules/task/types'
import { TaskRequestArgs } from 'modules/task/types'

import { FieldsErrors } from 'shared/services/baseApi'

export type CancelSubTaskMutationArgs = TaskRequestArgs &
  BaseSubTaskRequestArgs & {
    cancelReason: string
  }

export type CancelSubTaskSuccessResponse = void

export type CancelSubTaskBadRequestErrorResponse = FieldsErrors<CancelSubTaskFormFields>
