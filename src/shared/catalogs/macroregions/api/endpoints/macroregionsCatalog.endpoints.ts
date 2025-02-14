import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetMacroregionsCatalogRequest,
  GetMacroregionsCatalogResponse,
} from 'shared/catalogs/api/endpoints/macroregions/schemas'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const macroregionsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMacroregionsCatalog: build.query<
      GetMacroregionsCatalogResponse,
      MaybeUndefined<GetMacroregionsCatalogRequest>
    >({
      query: (params) => ({
        url: CatalogEndpointsEnum.GetMacroregions,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetMacroregionsCatalogQuery } = macroregionsCatalogEndpoints
