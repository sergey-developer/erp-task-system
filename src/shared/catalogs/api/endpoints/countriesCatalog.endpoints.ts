import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetCountriesCatalogQueryArgs,
  GetCountriesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/countries'
import { HttpMethodEnum } from 'shared/constants/http'

const countriesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCountriesCatalog: build.query<
      GetCountriesCatalogSuccessResponse,
      GetCountriesCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetCountries,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCountriesCatalogQuery } = countriesCatalogEndpoints
