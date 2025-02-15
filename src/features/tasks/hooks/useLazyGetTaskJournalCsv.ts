import { useLazyGetTaskJournalCsvQuery } from 'features/tasks/api/endpoints/tasks.endpoints'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getTaskJournalCsvErrorMessage } from '../api/constants'
import { GetTaskJournalCsvRequest, GetTaskJournalCsvResponse } from '../api/schemas'

type UseLazyGetTaskJournalCsvResult = CustomUseLazyQueryHookResult<
  GetTaskJournalCsvRequest,
  GetTaskJournalCsvResponse
>

export const useLazyGetTaskJournalCsv = (): UseLazyGetTaskJournalCsvResult => {
  const [trigger, state] = useLazyGetTaskJournalCsvQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskJournalCsvErrorMessage)
    }
  }, [state.error])

  return [trigger, state]
}
