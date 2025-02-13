import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants'
import {
  GetCustomersCatalogQueryArgs,
  GetCustomersCatalogSuccessResponse,
} from 'shared/catalogs/customers/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const customersCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomersCatalog: build.query<
      GetCustomersCatalogSuccessResponse,
      GetCustomersCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetCustomers,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCustomersCatalogQuery, useLazyGetCustomersCatalogQuery } =
  customersCatalogEndpoints
