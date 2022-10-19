import { useCallback, useEffect } from 'react'

import { useTakeTaskMutation } from 'modules/task/services/taskApi.service'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { TakeTaskMutationArgsModel } from '../models'

const useTakeTask = () => {
  const [mutation, state] = useTakeTaskMutation()

  const fn = useCallback(
    async (data: TakeTaskMutationArgsModel) => {
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

export default useTakeTask
