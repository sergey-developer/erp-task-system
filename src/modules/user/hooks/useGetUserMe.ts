import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { useEffect } from 'react'

import { getUserMeMessages } from "modules/user/constants/messages";
import { useGetUserMeQuery } from 'modules/user/services/userApi.service'

import { CustomBaseQueryFn, isErrorResponse } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetUserMeQueryArgs, GetUserMeSuccessResponse } from '../models'

export const useGetUserMe = (): TypedUseQueryHookResult<
  GetUserMeSuccessResponse,
  GetUserMeQueryArgs,
  CustomBaseQueryFn
> => {
  const state = useGetUserMeQuery()

  useEffect(() => {
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserMeMessages.commonError)
    }
  }, [state.error, state.isError])

  return state
}
