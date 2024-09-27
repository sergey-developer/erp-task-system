import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getInfrastructureWorkTypesErrMsg } from 'shared/constants/catalogs'
import {
  GetInfrastructureWorkTypesQueryArgs,
  GetInfrastructureWorkTypesSuccessResponse,
} from 'shared/models/catalogs/infrastructureWorkTypes'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetInfrastructureWorkTypesQuery } from 'shared/services/catalogsApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInfrastructureWorkTypesResult = CustomUseQueryHookResult<
  GetInfrastructureWorkTypesQueryArgs,
  GetInfrastructureWorkTypesSuccessResponse
>

type UseGetInfrastructureWorkTypesOptions = CustomUseQueryOptions<
  GetInfrastructureWorkTypesQueryArgs,
  GetInfrastructureWorkTypesSuccessResponse
>

export const useGetInfrastructureWorkTypes = (
  args: GetInfrastructureWorkTypesQueryArgs,
  options?: UseGetInfrastructureWorkTypesOptions,
): UseGetInfrastructureWorkTypesResult => {
  const state = useGetInfrastructureWorkTypesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getInfrastructureWorkTypesErrMsg)
    }
  }, [state.error])

  return state
}
