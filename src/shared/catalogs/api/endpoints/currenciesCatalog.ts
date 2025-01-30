import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetCurrencyListQueryArgs,
  GetCurrencyListSuccessResponse,
} from 'shared/catalogs/models/currencies'
import { HttpMethodEnum } from 'shared/constants/http'

const currenciesCatalogEndpoints = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getCurrencies: build.query<GetCurrencyListSuccessResponse, GetCurrencyListQueryArgs>({
      query: () => ({
        url: CatalogsApiEnum.GetCurrencies,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCurrenciesQuery } = currenciesCatalogEndpoints
