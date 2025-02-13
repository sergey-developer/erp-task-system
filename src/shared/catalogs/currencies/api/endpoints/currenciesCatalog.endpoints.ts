import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import { HttpMethodEnum } from 'shared/constants/http'

import { GetCurrenciesCatalogQueryArgs, GetCurrenciesCatalogSuccessResponse } from '../schemas'

const currenciesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrenciesCatalog: build.query<
      GetCurrenciesCatalogSuccessResponse,
      GetCurrenciesCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetCurrencies,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCurrenciesCatalogQuery } = currenciesCatalogEndpoints
