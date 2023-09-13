import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { GetTaskJournalQueryArgs, GetTaskJournalSuccessResponse } from 'modules/task/models'
import { taskJournalApiPermissions } from 'modules/task/permissions'
import { useGetTaskJournalQuery } from 'modules/task/services/taskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/common'
import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskJournalResult = CustomUseQueryHookResult<
  GetTaskJournalQueryArgs,
  GetTaskJournalSuccessResponse
>

export const useGetTaskJournal = (args: GetTaskJournalQueryArgs): UseGetTaskJournalResult => {
  const permissions = useUserPermissions(taskJournalApiPermissions.list)
  const state = useGetTaskJournalQuery(args, { skip: !permissions.canGetList })

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error])

  return state
}
