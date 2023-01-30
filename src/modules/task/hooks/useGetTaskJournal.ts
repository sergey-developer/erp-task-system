import { useEffect } from 'react'

import { GetTaskJournalQueryArgs } from 'modules/task/models'
import { taskJournalApiPermissions } from 'modules/task/permissions'
import { useGetTaskJournalQuery } from 'modules/task/services/taskJournalApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { commonApiMessages } from 'shared/constants/errors'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetTaskJournal = (id: GetTaskJournalQueryArgs) => {
  const permissions = useUserPermissions(taskJournalApiPermissions.list)
  const state = useGetTaskJournalQuery(id, { skip: !permissions.canGetList })

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(commonApiMessages.unknownError)
  }, [state.isError])

  return state
}
