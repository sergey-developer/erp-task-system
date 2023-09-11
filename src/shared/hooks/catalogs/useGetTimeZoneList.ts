import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getTimeZoneListMessages } from 'shared/constants/catalogs'
import { GetTimeZoneListQueryArgs, GetTimeZoneListSuccessResponse } from 'shared/models/catalogs'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetTimeZoneListQuery } from 'shared/services/catalogsApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTimeZoneListResult = CustomUseQueryHookResult<
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse
>

export const useGetTimeZoneList = (): UseGetTimeZoneListResult => {
  const state = useGetTimeZoneListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTimeZoneListMessages.commonError)
    }
  }, [state.error])

  return state
}
