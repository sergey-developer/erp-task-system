import { FiscalAccumulatorApiEnum } from 'modules/fiscalAccumulator/constants'
import {
  GetFiscalAccumulatorsQueryArgs,
  GetFiscalAccumulatorsSuccessResponse,
} from 'modules/fiscalAccumulator/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const fiscalAccumulatorApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getFiscalAccumulators: build.query<
      GetFiscalAccumulatorsSuccessResponse,
      GetFiscalAccumulatorsQueryArgs
    >({
      query: (params) => ({
        url: FiscalAccumulatorApiEnum.GetFiscalAccumulators,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetFiscalAccumulatorsQuery } = fiscalAccumulatorApiService
