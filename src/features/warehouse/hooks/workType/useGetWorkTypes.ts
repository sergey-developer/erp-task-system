import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWorkTypesErrMsg } from 'features/warehouse/constants/workType'
import { GetWorkTypesQueryArgs, GetWorkTypesSuccessResponse } from 'features/warehouse/models'
import { useGetWorkTypesQuery } from 'features/warehouse/services/workTypeApi.service'

import { isErrorResponse } from 'shared/api/baseApi'
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
