import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getSubTaskTemplatesCatalogErrMsg } from '../api/constants'
import { useGetSubTaskTemplatesCatalogQuery } from '../api/endpoints/subTaskTemplatesCatalog.endpoints'
import {
  GetSubTaskTemplatesCatalogQueryArgs,
  GetSubTaskTemplatesCatalogSuccessResponse,
} from '../api/schemas'

type UseGetSubTaskTemplatesCatalogResult = CustomUseQueryHookResult<
  GetSubTaskTemplatesCatalogQueryArgs,
  GetSubTaskTemplatesCatalogSuccessResponse
>

type UseGetSubTaskTemplatesCatalogOptions = CustomUseQueryOptions<
  GetSubTaskTemplatesCatalogQueryArgs,
  GetSubTaskTemplatesCatalogSuccessResponse
>

export const useGetSubTaskTemplatesCatalog = (
  args?: GetSubTaskTemplatesCatalogQueryArgs,
  opts?: UseGetSubTaskTemplatesCatalogOptions,
): UseGetSubTaskTemplatesCatalogResult => {
  const state = useGetSubTaskTemplatesCatalogQuery(args, opts)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSubTaskTemplatesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
