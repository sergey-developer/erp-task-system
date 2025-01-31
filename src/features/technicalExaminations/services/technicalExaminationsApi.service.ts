import { TechnicalExaminationsApiEnum } from 'features/technicalExaminations/constants'
import {
  GetTechnicalExaminationPdfSuccessResponse,
  GetTechnicalExaminationQueryArgs,
  GetTechnicalExaminationsQueryArgs,
  GetTechnicalExaminationsSuccessResponse,
  GetTechnicalExaminationSuccessResponse,
} from 'features/technicalExaminations/models'
import { GetTechnicalExaminationPdfTransformedSuccessResponse } from 'features/technicalExaminations/types'
import { makeGetTechnicalExaminationUrl } from 'features/technicalExaminations/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'

const technicalExaminationsApiService = baseApi.injectEndpoints({
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
