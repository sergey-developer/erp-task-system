import { useCallback, useEffect } from 'react'

import { TakeTaskMutationArgs } from 'modules/task/models'
import { useTakeTaskMutation } from 'modules/task/services/taskApi.service'

import { commonApiMessages } from 'shared/constants/errors'
import { isErrorResponse, isForbiddenError } from 'shared/services/api'
import {
  showErrorNotification,
  showMultipleErrorNotification,
} from 'shared/utils/notifications'

export const useTakeTask = () => {
  const [mutation, state] = useTakeTaskMutation()

  const fn = useCallback(
    async (data: TakeTaskMutationArgs) => {
      await mutation(data).unwrap()
    },
    [mutation],
  )

  useEffect(() => {
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showMultipleErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [state.error, state.isError])

  return { fn, state }
}
