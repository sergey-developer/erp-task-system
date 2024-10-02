import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getFaChangeTypesCatalogErrMsg } from 'shared/constants/catalogs'
import {
  GetFaChangeTypesQueryArgs,
  GetFaChangeTypesSuccessResponse,
} from 'shared/models/catalogs/faChangeTypes'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetFaChangeTypesQuery } from 'shared/services/catalogsApi.service'
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
  const state = useGetFaChangeTypesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getFaChangeTypesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
