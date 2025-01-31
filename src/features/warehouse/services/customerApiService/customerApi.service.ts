import { GetCustomerListQueryArgs, GetCustomerListSuccessResponse } from 'features/warehouse/models'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import { CustomerApiEnum } from './constants'

const customerApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomerList: build.query<GetCustomerListSuccessResponse, GetCustomerListQueryArgs>({
      query: () => ({
        url: CustomerApiEnum.GetCustomerList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCustomerListQuery, useLazyGetCustomerListQuery } = customerApiService
