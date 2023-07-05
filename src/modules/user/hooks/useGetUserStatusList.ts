import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { useEffect } from 'react'

import { getUserStatusListErrorMessages } from 'modules/user/constants/errorMessages'
import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'modules/user/models'
import { useGetUserStatusListQuery } from 'modules/user/services/userApi.service'

import { CustomBaseQueryFn, isErrorResponse } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetUserStatusList = (): TypedUseQueryHookResult<
  GetUserStatusListSuccessResponse,
  GetUserStatusListQueryArgs,
  CustomBaseQueryFn
> => {
  const state = useGetUserStatusListQuery()

  useEffect(() => {
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserStatusListErrorMessages.commonError)
    }
  }, [state.error, state.isError])

  return state
}
