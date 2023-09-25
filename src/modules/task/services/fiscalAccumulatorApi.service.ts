import { FiscalAccumulatorApiEnum } from 'modules/task/constants/fiscalAccumulator'
import {
  GetFiscalAccumulatorListQueryArgs,
  GetFiscalAccumulatorListSuccessResponse,
} from 'modules/task/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const fiscalAccumulatorApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getFiscalAccumulator: build.query<
      GetFiscalAccumulatorListSuccessResponse,
      GetFiscalAccumulatorListQueryArgs
    >({
      query: (params) => ({
        url: FiscalAccumulatorApiEnum.GetFiscalAccumulator,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetFiscalAccumulatorQuery } = fiscalAccumulatorApiService
