import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getTaskJournalCsvErrorMsg } from 'modules/task/constants/taskJournal'
import { GetTaskJournalCsvQueryArgs, GetTaskJournalCsvSuccessResponse } from 'modules/task/models'
import { useLazyGetTaskJournalCsvQuery } from 'modules/task/services/taskApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetTaskJournalCsvResult = CustomUseLazyQueryHookResult<
  GetTaskJournalCsvQueryArgs,
  GetTaskJournalCsvSuccessResponse
>

export const useLazyGetTaskJournalCsv = (): UseLazyGetTaskJournalCsvResult => {
  const [trigger, state] = useLazyGetTaskJournalCsvQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskJournalCsvErrorMsg)
    }
  }, [state.error])

  return [trigger, state]
}
