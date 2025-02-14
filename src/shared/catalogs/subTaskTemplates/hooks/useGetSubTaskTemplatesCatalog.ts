import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getSubTaskTemplatesCatalogErrMsg } from '../api/constants'
import { useGetSubTaskTemplatesCatalogQuery } from '../api/endpoints/subTaskTemplatesCatalog.endpoints'
import {
  GetSubTaskTemplatesCatalogRequest,
  GetSubTaskTemplatesCatalogResponse,
} from '../api/schemas'

type UseGetSubTaskTemplatesCatalogResult = CustomUseQueryHookResult<
  GetSubTaskTemplatesCatalogRequest,
  GetSubTaskTemplatesCatalogResponse
>

type UseGetSubTaskTemplatesCatalogOptions = CustomUseQueryOptions<
  GetSubTaskTemplatesCatalogRequest,
  GetSubTaskTemplatesCatalogResponse
>

export const useGetSubTaskTemplatesCatalog = (
  args?: GetSubTaskTemplatesCatalogRequest,
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
