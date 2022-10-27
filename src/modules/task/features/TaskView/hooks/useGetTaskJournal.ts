import { useEffect } from 'react'

import { GetTaskJournalQueryArgsModel } from 'modules/task/features/TaskView/models'
import { useGetTaskJournalQuery } from 'modules/task/services/taskJournalApi.service'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import { showErrorNotification } from 'shared/utils/notifications'

const useGetTaskJournal = (id: GetTaskJournalQueryArgsModel) => {
  const state = useGetTaskJournalQuery(id)

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(UNKNOWN_ERROR_MSG)
  }, [state.isError])

  return state
}

export default useGetTaskJournal
