import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { useGetMacroregionsCatalogQuery } from 'shared/catalogs/macroregions/api/endpoints/macroregionsCatalog.endpoints'
import {
  GetMacroregionsCatalogRequest,
  GetMacroregionsCatalogResponse,
} from 'shared/catalogs/macroregions/api/schemas'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getMacroregionsCatalogErrMsg } from '../api/constants'

type UseGetMacroregionsCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetMacroregionsCatalogRequest>,
  GetMacroregionsCatalogResponse
>

type UseGetMacroregionsCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetMacroregionsCatalogRequest>,
  GetMacroregionsCatalogResponse
>

export const useGetMacroregionsCatalog = (
  args?: GetMacroregionsCatalogRequest,
  options?: UseGetMacroregionsCatalogOptions,
): UseGetMacroregionsCatalogResult => {
  const state = useGetMacroregionsCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getMacroregionsCatalogErrMsg)
    }
  }, [state.error])

  return state
}
