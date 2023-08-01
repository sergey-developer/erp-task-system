import { CancelSubTaskFormFields } from 'modules/subTask/components/CancelSubTaskModal/interfaces'
import { BaseSubTaskRequestArgs } from 'modules/subTask/interfaces'
import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { FieldsErrors } from 'shared/services/api'

export type CancelSubTaskMutationArgs = BaseTaskRequestArgs &
  BaseSubTaskRequestArgs & {
    cancelReason: string
  }

export type CancelSubTaskSuccessResponse = void

export type CancelSubTaskBadRequestErrorResponse =
  FieldsErrors<CancelSubTaskFormFields>
