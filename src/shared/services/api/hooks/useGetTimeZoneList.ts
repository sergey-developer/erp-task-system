import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { useEffect } from 'react'

import { showErrorNotification } from 'shared/utils/notifications'

import { useGetTimeZoneListQuery } from '../baseApi.service'
import { getTimeZoneListMessages } from '../constants'
import { CustomBaseQueryFn } from '../intefraces'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from '../models'
import { isErrorResponse } from '../utils'

export const useGetTimeZoneList = (): TypedUseQueryHookResult<
  GetTimeZoneListSuccessResponse,
  GetTimeZoneListQueryArgs,
  CustomBaseQueryFn
> => {
  const state = useGetTimeZoneListQuery()

  useEffect(() => {
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      showErrorNotification(getTimeZoneListMessages.commonError)
    }
  }, [state.error, state.isError])

  return state
}
