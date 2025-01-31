import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetCurrencyListQueryArgs,
  GetCurrencyListSuccessResponse,
} from 'shared/catalogs/api/dto/currencies'
import { HttpMethodEnum } from 'shared/constants/http'

const currenciesCatalogEndpoints = baseApi.injectEndpoints({
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
