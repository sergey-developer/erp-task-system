import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getTaskListMessages } from 'modules/task/constants'
import { GetTaskListQueryArgs } from 'modules/task/models'
import { useLazyGetTaskListQuery } from 'modules/task/services/taskApiService'
import { GetTaskListTransformedSuccessResponse } from 'modules/task/types'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetTaskListResult = CustomUseLazyQueryHookResult<
  GetTaskListQueryArgs,
  GetTaskListTransformedSuccessResponse
>

export const useLazyGetTaskList = (): UseLazyGetTaskListResult => {
  const [trigger, state] = useLazyGetTaskListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskListMessages.commonError)
    }
  }, [state.error])

  return [trigger, state]
}
