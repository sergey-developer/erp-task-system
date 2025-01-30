import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetCountryListQueryArgs,
  GetCountryListSuccessResponse,
} from 'shared/catalogs/models/countries'
import { HttpMethodEnum } from 'shared/constants/http'

const countriesCatalogEndpoints = baseApiService.injectEndpoints({
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
