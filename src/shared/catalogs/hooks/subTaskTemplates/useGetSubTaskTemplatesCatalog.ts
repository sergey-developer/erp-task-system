import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getSubTaskTemplatesCatalogErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import {
  GetSubTaskTemplatesCatalogQueryArgs,
  GetSubTaskTemplatesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/subTaskTemplates'
import { useGetSubTaskTemplatesCatalogQuery } from 'shared/catalogs/api/endpoints/subTaskTemplatesCatalog.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

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
