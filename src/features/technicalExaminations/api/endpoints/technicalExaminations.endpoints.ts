import { TechnicalExaminationsApiPathsEnum } from 'features/technicalExaminations/api/constants'
import { makeGetTechnicalExaminationApiPath } from 'features/technicalExaminations/api/helpers'
import { GetTechnicalExaminationPdfTransformedResponse } from 'features/technicalExaminations/api/types'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'

import {
  GetTechnicalExaminationPdfResponse,
  GetTechnicalExaminationRequest,
  GetTechnicalExaminationResponse,
  GetTechnicalExaminationsRequest,
  GetTechnicalExaminationsResponse,
} from '../schemas'

const technicalExaminationsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTechnicalExaminations: build.query<
      GetTechnicalExaminationsResponse,
      GetTechnicalExaminationsRequest
    >({
      query: (params) => ({
        url: TechnicalExaminationsApiPathsEnum.GetTechnicalExaminations,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getTechnicalExamination: build.query<
      GetTechnicalExaminationResponse,
      GetTechnicalExaminationRequest
    >({
      query: ({ technicalExaminationId }) => ({
        url: makeGetTechnicalExaminationApiPath({ technicalExaminationId }),
        method: HttpMethodEnum.Get,
      }),
    }),
    getTechnicalExaminationPdf: build.query<
      GetTechnicalExaminationPdfTransformedResponse,
      GetTechnicalExaminationRequest
    >({
      query: ({ technicalExaminationId }) => ({
        url: makeGetTechnicalExaminationApiPath({ technicalExaminationId }),
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
} = technicalExaminationsEndpoints
