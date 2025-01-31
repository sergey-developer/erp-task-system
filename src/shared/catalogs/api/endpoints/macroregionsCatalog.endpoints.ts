import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetMacroregionsQueryArgs,
  GetMacroregionsSuccessResponse,
} from 'shared/catalogs/api/dto/macroregions'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const macroregionsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMacroregionsCatalog: build.query<
      GetMacroregionsSuccessResponse,
      MaybeUndefined<GetMacroregionsQueryArgs>
    >({
      query: (params) => ({
        url: CatalogsApiEnum.GetMacroregions,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetMacroregionsCatalogQuery } = macroregionsCatalogEndpoints
