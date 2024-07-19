import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWorkTypesErrMsg } from 'modules/warehouse/constants/workType'
import { GetWorkTypesQueryArgs, GetWorkTypesSuccessResponse } from 'modules/warehouse/models'
import { useGetWorkTypesQuery } from 'modules/warehouse/services/workTypeApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWorkTypeListResult = CustomUseQueryHookResult<
  MaybeUndefined<GetWorkTypesQueryArgs>,
  GetWorkTypesSuccessResponse
>

type UseGetWorkTypesOptions = CustomUseQueryOptions<
  MaybeUndefined<GetWorkTypesQueryArgs>,
  GetWorkTypesSuccessResponse
>

export const useGetWorkTypes = (
  args?: GetWorkTypesQueryArgs,
  options?: UseGetWorkTypesOptions,
): UseGetWorkTypeListResult => {
  const state = useGetWorkTypesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWorkTypesErrMsg)
    }
  }, [state.error])

  return state
}
