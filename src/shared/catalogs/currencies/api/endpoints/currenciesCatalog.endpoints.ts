import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import { HttpMethodEnum } from 'shared/constants/http'

import { GetCurrenciesCatalogRequest, GetCurrenciesCatalogResponse } from '../schemas'

const currenciesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrenciesCatalog: build.query<
      GetCurrenciesCatalogResponse,
      GetCurrenciesCatalogRequest
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetCurrencies,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCurrenciesCatalogQuery } = currenciesCatalogEndpoints
