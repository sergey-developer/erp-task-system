import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { GetTaskJournalCsvQueryArgs, GetTaskJournalCsvSuccessResponse } from 'modules/task/models'
import { useLazyGetTaskJournalCsvQuery } from 'modules/task/services/taskApi.service'

import { commonApiMessages } from 'shared/constants/common'
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
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error])

  return [trigger, state]
}
