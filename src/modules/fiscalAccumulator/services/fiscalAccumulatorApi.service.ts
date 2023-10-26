import { FiscalAccumulatorApiEnum } from 'modules/fiscalAccumulator/constants'
import {
  GetFiscalAccumulatorListQueryArgs,
  GetFiscalAccumulatorListSuccessResponse,
} from 'modules/fiscalAccumulator/models'

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
