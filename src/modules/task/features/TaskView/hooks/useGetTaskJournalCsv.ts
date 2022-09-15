import { useEffect } from 'react'

import { useLazyGetTaskJournalCsvQuery } from 'modules/task/services/taskApi.service'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/messages'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { GetTaskJournalCsvQueryArgsModel } from '../models'

const useGetTaskJournalCsv = () => {
  const [trigger, state] = useLazyGetTaskJournalCsvQuery()

  const fn = async (data: GetTaskJournalCsvQueryArgsModel) => {
    return trigger(data).unwrap()
  }

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(UNKNOWN_ERROR_MSG)
  }, [state.isError])

  return { fn, state }
}

export default useGetTaskJournalCsv
