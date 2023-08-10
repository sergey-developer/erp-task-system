import { useCallback, useEffect } from 'react'

import { GetTaskJournalCsvQueryArgs } from 'modules/task/models'
import { taskJournalApiPermissions } from 'modules/task/permissions'
import { useLazyGetTaskJournalCsvQuery } from 'modules/task/services/taskJournalApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/errors'
import { isErrorResponse } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useLazyGetTaskJournalCsv = () => {
  const permissions = useUserPermissions(taskJournalApiPermissions.csv)
  const [trigger, state] = useLazyGetTaskJournalCsvQuery()

  const fn = useCallback(
    async (data: GetTaskJournalCsvQueryArgs) => {
      if (permissions.canGet) {
        return trigger(data).unwrap()
      }
    },
    [permissions.canGet, trigger],
  )

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error])

  return { fn, state }
}
