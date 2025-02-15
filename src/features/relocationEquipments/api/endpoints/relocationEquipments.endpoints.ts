import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import { RelocationEquipmentsEndpointsTagsEnum } from '../constants'
import {
  makeCreateRelocationEquipmentTechnicalExaminationApiPath,
  makeGetRelocationEquipmentAttachmentsApiPath,
  makeGetRelocationEquipmentTechnicalExaminationApiPath,
} from '../helpers'
import {
  CreateRelocationEquipmentTechnicalExaminationRequest,
  CreateRelocationEquipmentTechnicalExaminationResponse,
  GetRelocationEquipmentAttachmentsRequest,
  GetRelocationEquipmentAttachmentsResponse,
  GetRelocationEquipmentTechnicalExaminationRequest,
  GetRelocationEquipmentTechnicalExaminationResponse,
} from '../schemas'

const relocationEquipmentsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRelocationEquipmentAttachments: build.query<
      GetRelocationEquipmentAttachmentsResponse,
      GetRelocationEquipmentAttachmentsRequest
    >({
      providesTags: (result, error) =>
        error ? [] : [RelocationEquipmentsEndpointsTagsEnum.RelocationEquipmentAttachments],
      query: ({ relocationEquipmentId }) => ({
        url: makeGetRelocationEquipmentAttachmentsApiPath(relocationEquipmentId),
        method: HttpMethodEnum.Get,
      }),
    }),

    getRelocationEquipmentTechnicalExamination: build.query<
      GetRelocationEquipmentTechnicalExaminationResponse,
      GetRelocationEquipmentTechnicalExaminationRequest
    >({
      query: ({ relocationEquipmentId }) => ({
        url: makeGetRelocationEquipmentTechnicalExaminationApiPath(relocationEquipmentId),
        method: HttpMethodEnum.Get,
      }),
      transformResponse: (
        baseQueryReturnValue: GetRelocationEquipmentTechnicalExaminationResponse,
      ) => baseQueryReturnValue || undefined,
    }),
    createRelocationEquipmentTechnicalExamination: build.mutation<
      CreateRelocationEquipmentTechnicalExaminationResponse,
      CreateRelocationEquipmentTechnicalExaminationRequest
    >({
      query: ({ relocationEquipmentId, ...data }) => ({
        url: makeCreateRelocationEquipmentTechnicalExaminationApiPath(relocationEquipmentId),
        method: HttpMethodEnum.Post,
        data,
      }),
    }),
  }),
})

export const {
  useGetRelocationEquipmentAttachmentsQuery,
  useGetRelocationEquipmentTechnicalExaminationQuery,
  useCreateRelocationEquipmentTechnicalExaminationMutation,
} = relocationEquipmentsEndpoints
