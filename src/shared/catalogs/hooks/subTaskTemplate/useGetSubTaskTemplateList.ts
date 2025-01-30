import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { useGetSubTaskTemplatesCatalogQuery } from 'shared/catalogs/api/endpoints/subTaskTemplatesCatalog'
import { getSubTaskTemplatesCatalogErrMsg } from 'shared/catalogs/constants'
import {
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
} from 'shared/catalogs/models/subTaskTemplates'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSubTaskTemplateListResult = CustomUseQueryHookResult<
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse
>

type UseGetSubTaskTemplateListOptions = CustomUseQueryOptions<
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse
>

export const useGetSubTaskTemplateList = (
  args?: GetSubTaskTemplateListQueryArgs,
  opts?: UseGetSubTaskTemplateListOptions,
): UseGetSubTaskTemplateListResult => {
  const state = useGetSubTaskTemplatesCatalogQuery(args, opts)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSubTaskTemplatesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
