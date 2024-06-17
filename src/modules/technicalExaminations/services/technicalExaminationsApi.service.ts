import { TechnicalExaminationsApiEnum } from 'modules/technicalExaminations/constants'
import {
  GetTechnicalExaminationsQueryArgs,
  GetTechnicalExaminationsSuccessResponse,
} from 'modules/technicalExaminations/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const technicalExaminationsApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getTechnicalExaminations: build.query<
      GetTechnicalExaminationsSuccessResponse,
      GetTechnicalExaminationsQueryArgs
    >({
      query: (params) => ({
        url: TechnicalExaminationsApiEnum.GetTechnicalExaminations,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTechnicalExaminationsQuery } = technicalExaminationsApiService
