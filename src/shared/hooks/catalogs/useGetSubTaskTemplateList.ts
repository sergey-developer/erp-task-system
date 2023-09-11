import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getSubTaskTemplateListMessages } from 'shared/constants/catalogs'
import {
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
} from 'shared/models/catalogs'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetSubTaskTemplateListQuery } from 'shared/services/catalogsApi.service'
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
  const state = useGetSubTaskTemplateListQuery(args, opts)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSubTaskTemplateListMessages.commonError)
    }
  }, [state.error])

  return state
}
