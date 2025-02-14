import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import {
  GetCustomersCatalogRequest,
  GetCustomersCatalogResponse,
} from 'shared/catalogs/customers/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const customersCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomersCatalog: build.query<GetCustomersCatalogResponse, GetCustomersCatalogRequest>({
      query: () => ({
        url: CatalogApiPathsEnum.GetCustomers,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCustomersCatalogQuery, useLazyGetCustomersCatalogQuery } =
  customersCatalogEndpoints
