import { CountryApiEnum } from 'shared/constants/country'
import { HttpMethodEnum } from 'shared/constants/http'
import { GetCountryListQueryArgs, GetCountryListSuccessResponse } from 'shared/models/country'
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
