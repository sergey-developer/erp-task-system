import { TechnicalExaminationsEndpointsEnum } from 'features/technicalExaminations/constants'
import {
  GetTechnicalExaminationPdfResponse,
  GetTechnicalExaminationRequest,
  GetTechnicalExaminationsRequest,
  GetTechnicalExaminationsResponse,
  GetTechnicalExaminationResponse,
} from 'features/technicalExaminations/models'
import { GetTechnicalExaminationPdfTransformedResponse } from 'features/technicalExaminations/types'
import { makeGetTechnicalExaminationUrl } from 'features/technicalExaminations/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'

const technicalExaminationsApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTechnicalExaminations: build.query<
      GetTechnicalExaminationsResponse,
      GetTechnicalExaminationsRequest
    >({
      query: (params) => ({
        url: TechnicalExaminationsEndpointsEnum.GetTechnicalExaminations,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getTechnicalExamination: build.query<
      GetTechnicalExaminationResponse,
      GetTechnicalExaminationRequest
    >({
      query: ({ technicalExaminationId }) => ({
        url: makeGetTechnicalExaminationUrl({ technicalExaminationId }),
        method: HttpMethodEnum.Get,
      }),
    }),
    getTechnicalExaminationPdf: build.query<
      GetTechnicalExaminationPdfTransformedResponse,
      GetTechnicalExaminationRequest
    >({
      query: ({ technicalExaminationId }) => ({
        url: makeGetTechnicalExaminationUrl({ technicalExaminationId }),
        method: HttpMethodEnum.Get,
        headers: { Accept: MimetypeEnum.Pdf },
      }),
      transformResponse: (value: GetTechnicalExaminationPdfResponse, meta) => ({
        value,
        meta,
      }),
    }),
  }),
})

export const {
  useGetTechnicalExaminationsQuery,
  useGetTechnicalExaminationQuery,
  useLazyGetTechnicalExaminationPdfQuery,
} = technicalExaminationsApiService
