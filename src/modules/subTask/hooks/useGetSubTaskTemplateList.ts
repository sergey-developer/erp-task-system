import { TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import { UseQueryStateOptions } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { useEffect } from 'react'

import { subTaskApiMessages } from 'modules/subTask/constants/errorMessages'
import {
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
} from 'modules/subTask/models'
import { useGetSubTaskTemplateListQuery } from 'modules/subTask/services/subTaskApi.service'

import { CustomBaseQueryFn } from 'shared/services/api'
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
    if (!state.isError) return

    showErrorNotification(subTaskApiMessages.getSubTaskTemplateList.commonError)
  }, [state.isError])

  return state
}
