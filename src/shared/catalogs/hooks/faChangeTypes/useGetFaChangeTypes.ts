import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import {
  GetFaChangeTypesQueryArgs,
  GetFaChangeTypesSuccessResponse,
} from 'shared/catalogs/api/dto/faChangeTypes'
import { useGetFaChangeTypesCatalogQuery } from 'shared/catalogs/api/endpoints/faChangeTypesCatalog.endpoints'
import { getFaChangeTypesCatalogErrMsg } from 'shared/catalogs/constants'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetFaChangeTypesResult = CustomUseQueryHookResult<
  MaybeUndefined<GetFaChangeTypesQueryArgs>,
  GetFaChangeTypesSuccessResponse
>

type UseGetFaChangeTypesOptions = CustomUseQueryOptions<
  MaybeUndefined<GetFaChangeTypesQueryArgs>,
  GetFaChangeTypesSuccessResponse
>

export const useGetFaChangeTypes = (
  args?: GetFaChangeTypesQueryArgs,
  options?: UseGetFaChangeTypesOptions,
): UseGetFaChangeTypesResult => {
  const state = useGetFaChangeTypesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getFaChangeTypesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
