import { LegalEntityApiEnum } from 'modules/warehouse/constants'
import {
  GetLegalEntityListQueryArgs,
  GetLegalEntityListSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const legalEntityApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getLegalEntityList: build.query<
      GetLegalEntityListSuccessResponse,
      GetLegalEntityListQueryArgs
    >({
      query: () => ({
        url: LegalEntityApiEnum.GetLegalEntityList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetLegalEntityListQuery } = legalEntityApiService
