import { HttpMethodEnum } from 'shared/constants/http'
import { MacroregionApiEnum } from 'shared/constants/macroregion'
import { GetMacroregionsQueryArgs, GetMacroregionsSuccessResponse } from 'shared/models/macroregion'
import { baseApiService } from 'shared/api/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const macroregionApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getMacroregions: build.query<
      GetMacroregionsSuccessResponse,
      MaybeUndefined<GetMacroregionsQueryArgs>
    >({
      query: (params) => ({
        url: MacroregionApiEnum.GetMacroregions,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetMacroregionsQuery } = macroregionApiService
