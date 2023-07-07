import { useEffect } from 'react'

import { CustomLazyQueryHookResult } from 'lib/rtk-query/interfaces'

import { getTaskWorkPerformedActMessages } from 'modules/task/constants'
import {
  GetTaskWorkPerformedActQueryArgs,
  GetTaskWorkPerformedActSuccessResponse,
} from 'modules/task/models'
import { useLazyGetTaskWorkPerformedActQuery } from 'modules/task/services/taskApi.service'

import { isErrorResponse, isNotFoundError } from 'shared/services/api'
import {
  showErrorNotification,
  showMultipleErrorNotification,
} from 'shared/utils/notifications'

export type UseLazyGetTaskWorkPerformedActResult = CustomLazyQueryHookResult<
  GetTaskWorkPerformedActQueryArgs,
  GetTaskWorkPerformedActSuccessResponse
>

export type UseLazyGetTaskWorkPerformedActTrigger =
  UseLazyGetTaskWorkPerformedActResult[0]

export const useLazyGetTaskWorkPerformedAct =
  (): UseLazyGetTaskWorkPerformedActResult => {
    const [trigger, state] = useLazyGetTaskWorkPerformedActQuery()

    useEffect(() => {
      if (!state.isError) return

      if (isErrorResponse(state.error)) {
        if (isNotFoundError(state.error) && state.error.data.detail) {
          showMultipleErrorNotification(state.error.data.detail)
        } else {
          showErrorNotification(getTaskWorkPerformedActMessages.commonError)
        }
      }
    }, [state.error, state.isError])

    return [trigger, state]
  }
