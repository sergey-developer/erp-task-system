import { TechnicalExaminationsApiEnum } from 'modules/technicalExaminations/constants'
import {
  GetTechnicalExaminationPdfSuccessResponse,
  GetTechnicalExaminationQueryArgs,
  GetTechnicalExaminationsQueryArgs,
  GetTechnicalExaminationsSuccessResponse,
  GetTechnicalExaminationSuccessResponse,
} from 'modules/technicalExaminations/models'
import { GetTechnicalExaminationPdfTransformedSuccessResponse } from 'modules/technicalExaminations/types'
import { makeGetTechnicalExaminationUrl } from 'modules/technicalExaminations/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'
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
    getTechnicalExamination: build.query<
      GetTechnicalExaminationSuccessResponse,
      GetTechnicalExaminationQueryArgs
    >({
      query: ({ technicalExaminationId }) => ({
        url: makeGetTechnicalExaminationUrl({ technicalExaminationId }),
        method: HttpMethodEnum.Get,
      }),
    }),
    getTechnicalExaminationPdf: build.query<
      GetTechnicalExaminationPdfTransformedSuccessResponse,
      GetTechnicalExaminationQueryArgs
    >({
      query: ({ technicalExaminationId }) => ({
        url: makeGetTechnicalExaminationUrl({ technicalExaminationId }),
        method: HttpMethodEnum.Get,
        headers: { Accept: MimetypeEnum.Pdf },
      }),
      transformResponse: (value: GetTechnicalExaminationPdfSuccessResponse, meta) => ({
        value,
        meta,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTechnicalExaminationsQuery,
  useGetTechnicalExaminationQuery,
  useLazyGetTechnicalExaminationPdfQuery,
} = technicalExaminationsApiService
