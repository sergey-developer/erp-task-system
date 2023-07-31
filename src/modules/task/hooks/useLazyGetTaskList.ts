import { useEffect } from 'react'

import { CustomLazyQueryHookResult } from 'lib/rtk-query/interfaces'

import { getTaskListMessages } from 'modules/task/constants'
import { GetTaskListTransformedSuccessResponse } from 'modules/task/interfaces'
import { GetTaskListQueryArgs } from 'modules/task/models'
import { useLazyGetTaskListQuery } from 'modules/task/services/taskApi.service'

import { showErrorNotification } from 'shared/utils/notifications'

export const useLazyGetTaskList = (): CustomLazyQueryHookResult<
  GetTaskListQueryArgs,
  GetTaskListTransformedSuccessResponse
> => {
  const [trigger, state] = useLazyGetTaskListQuery()

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(getTaskListMessages.commonError)
  }, [state.isError])

  return [trigger, state]
}
