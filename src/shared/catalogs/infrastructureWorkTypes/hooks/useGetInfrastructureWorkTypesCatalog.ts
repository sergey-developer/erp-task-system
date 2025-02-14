import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getInfrastructureWorkTypesCatalogErrMsg } from '../api/constants'
import { useGetInfrastructureWorkTypesCatalogQuery } from '../api/endpoints/infrastructureWorkTypesCatalog.endpoints'
import {
  GetInfrastructureWorkTypesCatalogRequest,
  GetInfrastructureWorkTypesCatalogResponse,
} from '../api/schemas'

type UseGetInfrastructureWorkTypesCatalogResult = CustomUseQueryHookResult<
  GetInfrastructureWorkTypesCatalogRequest,
  GetInfrastructureWorkTypesCatalogResponse
>

type UseGetInfrastructureWorkTypesCatalogOptions = CustomUseQueryOptions<
  GetInfrastructureWorkTypesCatalogRequest,
  GetInfrastructureWorkTypesCatalogResponse
>

export const useGetInfrastructureWorkTypesCatalog = (
  args: GetInfrastructureWorkTypesCatalogRequest,
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
