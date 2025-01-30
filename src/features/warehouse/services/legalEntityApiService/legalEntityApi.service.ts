import {
  GetLegalEntityListQueryArgs,
  GetLegalEntityListSuccessResponse,
} from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/api/services/baseApi'

import { LegalEntityApiEnum } from './constants'

const legalEntityApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getLegalEntityList: build.query<GetLegalEntityListSuccessResponse, GetLegalEntityListQueryArgs>(
      {
        query: () => ({
          url: LegalEntityApiEnum.GetLegalEntityList,
          method: HttpMethodEnum.Get,
        }),
      },
    ),
  }),
})

export const { useGetLegalEntityListQuery } = legalEntityApiService
