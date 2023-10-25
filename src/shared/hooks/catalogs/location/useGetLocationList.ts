import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getLocationListMessages } from 'shared/constants/catalogs'
import {
  GetLocationListQueryArgs,
  GetLocationListSuccessResponse,
} from 'shared/models/catalogs/location'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetLocationListQuery } from 'shared/services/catalogsApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetLocationListResult = CustomUseQueryHookResult<
  GetLocationListQueryArgs,
  GetLocationListSuccessResponse
>

export const useGetLocationList = (): UseGetLocationListResult => {
  const state = useGetLocationListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getLocationListMessages.commonError)
    }
  }, [state.error])

  return state
}
