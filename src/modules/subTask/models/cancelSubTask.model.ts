import { CancelSubTaskFormFields } from 'modules/subTask/components/CancelSubTaskModal/types'
import { BaseSubTaskRequestArgs } from 'modules/subTask/types'
import { BaseTaskRequestArgs } from 'modules/task/types'

import { FieldsErrors } from 'shared/services/baseApi'

export type CancelSubTaskMutationArgs = BaseTaskRequestArgs &
  BaseSubTaskRequestArgs & {
    cancelReason: string
  }

export type CancelSubTaskSuccessResponse = void

export type CancelSubTaskBadRequestErrorResponse =
  FieldsErrors<CancelSubTaskFormFields>
