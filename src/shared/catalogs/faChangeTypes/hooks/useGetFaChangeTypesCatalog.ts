import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { useGetFaChangeTypesCatalogQuery } from 'shared/catalogs/faChangeTypes/api/endpoints/faChangeTypesCatalog.endpoints'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getFaChangeTypesCatalogErrMsg } from '../api/constants'
import { GetFaChangeTypesCatalogRequest, GetFaChangeTypesCatalogResponse } from '../api/schemas'

type UseGetFaChangeTypesCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetFaChangeTypesCatalogRequest>,
  GetFaChangeTypesCatalogResponse
>

type UseGetFaChangeTypesCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetFaChangeTypesCatalogRequest>,
  GetFaChangeTypesCatalogResponse
>

export const useGetFaChangeTypesCatalog = (
  args?: GetFaChangeTypesCatalogRequest,
  options?: UseGetFaChangeTypesCatalogOptions,
): UseGetFaChangeTypesCatalogResult => {
  const state = useGetFaChangeTypesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getFaChangeTypesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
