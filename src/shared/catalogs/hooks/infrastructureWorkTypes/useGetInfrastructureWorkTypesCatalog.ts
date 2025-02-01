import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getInfrastructureWorkTypesCatalogErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import {
  GetInfrastructureWorkTypesCatalogQueryArgs,
  GetInfrastructureWorkTypesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/infrastructureWorkTypes'
import { useGetInfrastructureWorkTypesCatalogQuery } from 'shared/catalogs/api/endpoints/infrastructureWorkTypesCatalog.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInfrastructureWorkTypesCatalogResult = CustomUseQueryHookResult<
  GetInfrastructureWorkTypesCatalogQueryArgs,
  GetInfrastructureWorkTypesCatalogSuccessResponse
>

type UseGetInfrastructureWorkTypesCatalogOptions = CustomUseQueryOptions<
  GetInfrastructureWorkTypesCatalogQueryArgs,
  GetInfrastructureWorkTypesCatalogSuccessResponse
>

export const useGetInfrastructureWorkTypesCatalog = (
  args: GetInfrastructureWorkTypesCatalogQueryArgs,
  options?: UseGetInfrastructureWorkTypesCatalogOptions,
): UseGetInfrastructureWorkTypesCatalogResult => {
  const state = useGetInfrastructureWorkTypesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getInfrastructureWorkTypesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
