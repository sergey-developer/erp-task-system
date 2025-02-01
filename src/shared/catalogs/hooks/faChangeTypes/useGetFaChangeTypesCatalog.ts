import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getFaChangeTypesCatalogErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import {
  GetFaChangeTypesCatalogQueryArgs,
  GetFaChangeTypesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/faChangeTypes'
import { useGetFaChangeTypesCatalogQuery } from 'shared/catalogs/api/endpoints/faChangeTypesCatalog.endpoints'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetFaChangeTypesCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetFaChangeTypesCatalogQueryArgs>,
  GetFaChangeTypesCatalogSuccessResponse
>

type UseGetFaChangeTypesCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetFaChangeTypesCatalogQueryArgs>,
  GetFaChangeTypesCatalogSuccessResponse
>

export const useGetFaChangeTypesCatalog = (
  args?: GetFaChangeTypesCatalogQueryArgs,
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
