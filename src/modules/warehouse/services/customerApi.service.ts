import { CustomerApiEnum } from 'modules/warehouse/constants'
import {
  GetCustomerListQueryArgs,
  GetCustomerListSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const customerApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getCustomerList: build.query<
      GetCustomerListSuccessResponse,
      GetCustomerListQueryArgs
    >({
      query: () => ({
        url: CustomerApiEnum.GetCustomerList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCustomerListQuery } = customerApiService
