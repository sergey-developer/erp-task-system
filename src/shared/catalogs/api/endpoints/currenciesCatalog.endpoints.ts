import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetCurrenciesCatalogQueryArgs,
  GetCurrenciesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/currencies'
import { HttpMethodEnum } from 'shared/constants/http'

const currenciesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrencies: build.query<GetCurrenciesCatalogSuccessResponse, GetCurrenciesCatalogQueryArgs>({
      query: () => ({
        url: CatalogEndpointsEnum.GetCurrencies,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCurrenciesQuery } = currenciesCatalogEndpoints
