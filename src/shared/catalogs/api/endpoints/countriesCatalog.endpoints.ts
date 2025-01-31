import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetCountryListQueryArgs,
  GetCountryListSuccessResponse,
} from 'shared/catalogs/api/dto/countries'
import { HttpMethodEnum } from 'shared/constants/http'

const countriesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCountriesCatalog: build.query<GetCountryListSuccessResponse, GetCountryListQueryArgs>({
      query: () => ({
        url: CatalogsApiEnum.GetCountries,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCountriesCatalogQuery } = countriesCatalogEndpoints
