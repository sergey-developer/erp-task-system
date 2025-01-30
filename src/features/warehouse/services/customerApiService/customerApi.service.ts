import { GetCustomerListQueryArgs, GetCustomerListSuccessResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/api/services/baseApi'

import { CustomerApiEnum } from './constants'

const customerApiService = baseApiService.injectEndpoints({
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
