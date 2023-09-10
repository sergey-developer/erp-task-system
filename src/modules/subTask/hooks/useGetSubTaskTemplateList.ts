import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { UseQueryStateOptions } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { useEffect } from 'react'

import { getSubTaskTemplateListMessages } from 'modules/subTask/constants'
import {
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
} from 'modules/subTask/models'
import { useGetSubTaskTemplateListQuery } from 'modules/subTask/services/subTaskApi.service'

import { CustomBaseQueryFn, isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetSubTaskTemplateList = (
  params?: GetSubTaskTemplateListQueryArgs,
  opts?: UseQueryStateOptions<any, any>,
): TypedUseQueryHookResult<
  GetSubTaskTemplateListSuccessResponse,
  GetSubTaskTemplateListQueryArgs,
  CustomBaseQueryFn
> => {
  const state = useGetSubTaskTemplateListQuery(params, opts)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSubTaskTemplateListMessages.commonError)
    }
  }, [state.error])

  return state
}
