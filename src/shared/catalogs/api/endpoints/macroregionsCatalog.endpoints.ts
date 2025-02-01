import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetMacroregionsCatalogQueryArgs,
  GetMacroregionsCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/macroregions'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const macroregionsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMacroregionsCatalog: build.query<
      GetMacroregionsCatalogSuccessResponse,
      MaybeUndefined<GetMacroregionsCatalogQueryArgs>
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
