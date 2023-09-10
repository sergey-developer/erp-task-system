import { GetCountryListQueryArgs, GetCountryListSuccessResponse } from 'modules/country/models'
import { CountryApiEnum } from 'modules/warehouse/constants'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const countryApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getCountryList: build.query<GetCountryListSuccessResponse, GetCountryListQueryArgs>({
      query: () => ({
        url: CountryApiEnum.GetCountryList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetCountryListQuery } = countryApiService
