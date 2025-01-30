import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { useGetInfrastructureWorkTypesCatalogQuery } from 'shared/catalogs/api/endpoints/infrastructureWorkTypesCatalog'
import { getInfrastructureWorkTypesErrMsg } from 'shared/catalogs/constants'
import {
  GetInfrastructureWorkTypesQueryArgs,
  GetInfrastructureWorkTypesSuccessResponse,
} from 'shared/catalogs/models/infrastructureWorkTypes'
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
  const state = useGetInfrastructureWorkTypesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getInfrastructureWorkTypesErrMsg)
    }
  }, [state.error])

  return state
}
