import { useCallback, useEffect } from 'react'

import { TakeTaskMutationArgs } from 'modules/task/models'
import { useTakeTaskMutation } from 'modules/task/services/taskApi.service'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'
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

    showErrorNotification(UNKNOWN_ERROR_MSG)
  }, [state.isError])

  return { fn, state }
}
