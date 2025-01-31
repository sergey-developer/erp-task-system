import {
  GetLegalEntityListQueryArgs,
  GetLegalEntityListSuccessResponse,
} from 'features/warehouse/models'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import { LegalEntityApiEnum } from './constants'

const legalEntityApiService = baseApi.injectEndpoints({
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
