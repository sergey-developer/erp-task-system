import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskJournalErrMsg } from 'features/task/constants/taskJournal'
import { GetTaskJournalQueryArgs, GetTaskJournalSuccessResponse } from 'features/task/models'
import { useGetTaskJournalQuery } from 'features/task/services/taskApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskJournalResult = CustomUseQueryHookResult<
  GetTaskJournalQueryArgs,
  GetTaskJournalSuccessResponse
>

type UseGetTaskJournalOptions = CustomUseQueryOptions<
  GetTaskJournalQueryArgs,
  GetTaskJournalSuccessResponse
>

export const useGetTaskJournal = (
  args: GetTaskJournalQueryArgs,
  options?: UseGetTaskJournalOptions,
): UseGetTaskJournalResult => {
  const state = useGetTaskJournalQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTaskJournalErrMsg)
      }
    }
  }, [state.error])

  return state
}
