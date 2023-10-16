import { HttpMethodEnum } from 'shared/constants/http'
import { MacroregionApiEnum } from 'shared/constants/macroregion'
import {
  GetMacroregionListQueryArgs,
  GetMacroregionListSuccessResponse,
} from 'shared/models/macroregion'
import { baseApiService } from 'shared/services/baseApi'

const macroregionApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getMacroregionList: build.query<GetMacroregionListSuccessResponse, GetMacroregionListQueryArgs>(
      {
        query: (params) => ({
          url: MacroregionApiEnum.GetMacroregionList,
          method: HttpMethodEnum.Get,
          params,
        }),
      },
    ),
  }),
})

export const { useGetMacroregionListQuery } = macroregionApiService
