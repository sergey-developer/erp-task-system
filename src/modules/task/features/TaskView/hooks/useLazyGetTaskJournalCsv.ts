import { useCallback, useEffect } from 'react'

import { useLazyGetTaskJournalCsvQuery } from 'modules/task/services/taskJournalApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetTaskJournalCsvQueryArgsModel } from '../models'
import { taskJournalApiPermissions } from '../permissions'

const useLazyGetTaskJournalCsv = () => {
  const permissions = useUserPermissions(taskJournalApiPermissions.csv)
  const [trigger, state] = useLazyGetTaskJournalCsvQuery()

  const fn = useCallback(
    async (data: GetTaskJournalCsvQueryArgsModel) => {
      if (permissions.canGet) {
        return trigger(data).unwrap()
      }
    },
    [permissions.canGet, trigger],
  )

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(UNKNOWN_ERROR_MSG)
  }, [state.isError])

  return { fn, state }
}

export default useLazyGetTaskJournalCsv
