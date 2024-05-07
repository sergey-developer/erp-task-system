import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getRelocationTaskWaybillM15ErrMsg } from 'modules/warehouse/constants/relocationTask'
import {
  GetRelocationTaskWaybillM15QueryArgs,
  GetRelocationTaskWaybillM15SuccessResponse,
} from 'modules/warehouse/models'
import { useLazyGetRelocationTaskWaybillM15Query } from 'modules/warehouse/services/relocationTaskApi.service'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetRelocationTaskWaybillM15Result = CustomUseLazyQueryHookResult<
  GetRelocationTaskWaybillM15QueryArgs,
  GetRelocationTaskWaybillM15SuccessResponse
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
        showErrorNotification(getRelocationTaskWaybillM15ErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
