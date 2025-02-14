import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskJournalErrorMessage } from 'features/task/constants/taskJournal'
import { GetTaskJournalRequest, GetTaskJournalResponse } from 'features/task/models'
import { useGetTaskJournalQuery } from 'features/task/services/taskApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskJournalResult = CustomUseQueryHookResult<
  GetTaskJournalRequest,
  GetTaskJournalResponse
>

type UseGetTaskJournalOptions = CustomUseQueryOptions<
  GetTaskJournalRequest,
  GetTaskJournalResponse
>

export const useGetTaskJournal = (
  args: GetTaskJournalRequest,
  options?: UseGetTaskJournalOptions,
): UseGetTaskJournalResult => {
  const state = useGetTaskJournalQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTaskJournalErrorMessage)
      }
    }
  }, [state.error])

  return state
}
