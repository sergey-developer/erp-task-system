import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { useEffect } from 'react'

import { userProfileApiMessages } from 'modules/user/constants/errorMessages'
import { useGetUserProfileQuery } from 'modules/user/services/userApi.service'

import { CustomBaseQueryFn, isErrorResponse } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import {
  GetUserProfileQueryArgs,
  GetUserProfileSuccessResponse,
} from '../models'

export const useGetUserProfile = (): TypedUseQueryHookResult<
  GetUserProfileSuccessResponse,
  GetUserProfileQueryArgs,
  CustomBaseQueryFn
> => {
  const state = useGetUserProfileQuery()

  useEffect(() => {
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      showErrorNotification(userProfileApiMessages.getProfile.commonError)
    }
  }, [state.error, state.isError])

  return state
}
