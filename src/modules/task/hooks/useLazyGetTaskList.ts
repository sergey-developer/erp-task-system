import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getTaskListMessages } from 'modules/task/constants'
import { GetTaskListQueryArgs } from 'modules/task/models'
import { useLazyGetTaskListQuery } from 'modules/task/services/taskApi.service'
import { GetTaskListTransformedSuccessResponse } from 'modules/task/types'

import { isErrorResponse } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useLazyGetTaskList = (): CustomUseLazyQueryHookResult<
  GetTaskListQueryArgs,
  GetTaskListTransformedSuccessResponse
> => {
  const [trigger, state] = useLazyGetTaskListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskListMessages.commonError)
    }
  }, [state.error])

  return [trigger, state]
}
