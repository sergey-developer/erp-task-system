import { CurrencyApiEnum } from 'shared/constants/currency'
import { HttpMethodEnum } from 'shared/constants/http'
import { GetCurrencyListQueryArgs, GetCurrencyListSuccessResponse } from 'shared/models/currency'
import { baseApiService } from 'shared/services/baseApi'

const currencyApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getCurrencyList: build.query<GetCurrencyListSuccessResponse, GetCurrencyListQueryArgs>({
      query: () => ({
        url: CurrencyApiEnum.GetCurrencyList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCurrencyListQuery } = currencyApiService
