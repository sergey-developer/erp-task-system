import { getRelocationTaskWaybillM15ErrorMessage } from 'features/relocationTasks/api/constants'
import { useLazyGetRelocationTaskWaybillM15Query } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import {
  GetRelocationTaskWaybillM15Request,
  GetRelocationTaskWaybillM15Response,
} from 'features/relocationTasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetRelocationTaskWaybillM15Result = CustomUseLazyQueryHookResult<
  GetRelocationTaskWaybillM15Request,
  GetRelocationTaskWaybillM15Response
>

export const useLazyGetRelocationTaskWaybillM15 = (): UseLazyGetRelocationTaskWaybillM15Result => {
  const [trigger, state] = useLazyGetRelocationTaskWaybillM15Query()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isNotFoundError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getRelocationTaskWaybillM15ErrorMessage)
      }
    }
  }, [state.error])

  return [trigger, state]
}
