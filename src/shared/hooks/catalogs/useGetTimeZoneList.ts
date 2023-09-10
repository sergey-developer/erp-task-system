import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { useEffect } from 'react'

import { getTimeZoneListMessages } from 'shared/constants/catalogs'
import { GetTimeZoneListQueryArgs, GetTimeZoneListSuccessResponse } from 'shared/models'
import { CustomBaseQueryFn, isErrorResponse } from 'shared/services/baseApi'
import { useGetTimeZoneListQuery } from 'shared/services/catalogsApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetTimeZoneList = (): TypedUseQueryHookResult<
  GetTimeZoneListSuccessResponse,
  GetTimeZoneListQueryArgs,
  CustomBaseQueryFn
> => {
  const state = useGetTimeZoneListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTimeZoneListMessages.commonError)
    }
  }, [state.error])

  return state
}
