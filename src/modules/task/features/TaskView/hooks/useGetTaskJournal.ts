import { useEffect } from 'react'

import { GetTaskJournalQueryArgsModel } from 'modules/task/features/TaskView/models'
import { useGetTaskJournalQuery } from 'modules/task/services/taskJournalApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import { showErrorNotification } from 'shared/utils/notifications'

import { taskJournalApiPermissions } from '../permissions'

const useGetTaskJournal = (id: GetTaskJournalQueryArgsModel) => {
  const permissions = useUserPermissions(taskJournalApiPermissions.list)
  const state = useGetTaskJournalQuery(id, { skip: !permissions.canGetList })

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(UNKNOWN_ERROR_MSG)
  }, [state.isError])

  return state
}

export default useGetTaskJournal
