import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWorkTypeListMessages } from 'modules/warehouse/constants/workType'
import { GetWorkTypeListQueryArgs, GetWorkTypeListSuccessResponse } from 'modules/warehouse/models'
import { useGetWorkTypeListQuery } from 'modules/warehouse/services/workTypeApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWorkTypeListResult = CustomUseQueryHookResult<
  GetWorkTypeListQueryArgs,
  GetWorkTypeListSuccessResponse
>

type UseGetWorkTypeListOptions = CustomUseQueryOptions<
  GetWorkTypeListQueryArgs,
  GetWorkTypeListSuccessResponse
>

export const useGetWorkTypeList = (
  args?: GetWorkTypeListQueryArgs,
  options?: UseGetWorkTypeListOptions,
): UseGetWorkTypeListResult => {
  const state = useGetWorkTypeListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWorkTypeListMessages.commonError)
    }
  }, [state.error])

  return state
}
