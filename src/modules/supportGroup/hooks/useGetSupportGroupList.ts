import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { useEffect } from 'react'

import { getSupportGroupListMessages } from 'modules/supportGroup/constants'
import {
  GetSupportGroupListQueryArgs,
  GetSupportGroupListSuccessResponse,
} from 'modules/supportGroup/models'
import { useGetSupportGroupListQuery } from 'modules/supportGroup/services/supportGroupApi.service'

import { CustomBaseQueryFn } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetSupportGroupList = (
  args?: GetSupportGroupListQueryArgs,
): TypedUseQueryHookResult<
  GetSupportGroupListSuccessResponse,
  GetSupportGroupListQueryArgs,
  CustomBaseQueryFn
> => {
  const state = useGetSupportGroupListQuery(args)

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(getSupportGroupListMessages.commonError)
  }, [state.isError])

  return state
}
