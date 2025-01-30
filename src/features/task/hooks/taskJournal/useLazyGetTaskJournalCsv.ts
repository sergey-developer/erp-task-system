import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getTaskJournalCsvErrMsg } from 'features/task/constants/taskJournal'
import { GetTaskJournalCsvQueryArgs, GetTaskJournalCsvSuccessResponse } from 'features/task/models'
import { useLazyGetTaskJournalCsvQuery } from 'features/task/services/taskApi.service'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetTaskJournalCsvResult = CustomUseLazyQueryHookResult<
  GetTaskJournalCsvQueryArgs,
  GetTaskJournalCsvSuccessResponse
>

export const useLazyGetTaskJournalCsv = (): UseLazyGetTaskJournalCsvResult => {
  const [trigger, state] = useLazyGetTaskJournalCsvQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskJournalCsvErrMsg)
    }
  }, [state.error])

  return [trigger, state]
}
