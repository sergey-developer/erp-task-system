import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetCountriesCatalogRequest,
  GetCountriesCatalogResponse,
} from 'shared/catalogs/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const countriesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCountriesCatalog: build.query<GetCountriesCatalogResponse, GetCountriesCatalogRequest>({
      query: () => ({
        url: CatalogEndpointsEnum.GetCountries,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCountriesCatalogQuery } = countriesCatalogEndpoints
