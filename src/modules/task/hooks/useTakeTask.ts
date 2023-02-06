import { useCallback, useEffect } from 'react'

import { TakeTaskMutationArgs } from 'modules/task/models'
import { useTakeTaskMutation } from 'modules/task/services/taskApi.service'
import { commonApiMessages } from 'shared/constants/errors'
import { showErrorNotification } from 'shared/utils/notifications'

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

    showErrorNotification(commonApiMessages.unknownError)
  }, [state.isError])

  return { fn, state }
}
