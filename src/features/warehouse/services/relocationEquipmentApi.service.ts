import { RelocationEquipmentApiTagEnum } from 'features/warehouse/constants/relocationEquipment'
import {
  CreateRelocationEquipmentTechnicalExaminationRequest,
  CreateRelocationEquipmentTechnicalExaminationResponse,
  GetRelocationEquipmentAttachmentListRequest,
  GetRelocationEquipmentAttachmentListResponse,
  GetRelocationEquipmentTechnicalExaminationRequest,
  GetRelocationEquipmentTechnicalExaminationResponse,
} from 'features/warehouse/models/relocationEquipment'
import {
  createRelocationEquipmentTechnicalExaminationUrl,
  getRelocationEquipmentAttachmentListUrl,
  getRelocationEquipmentTechnicalExaminationUrl,
} from 'features/warehouse/utils/relocationEquipment'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const relocationEquipmentApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRelocationEquipmentAttachmentList: build.query<
      GetRelocationEquipmentAttachmentListResponse,
      GetRelocationEquipmentAttachmentListRequest
    >({
      providesTags: (result, error) =>
        error ? [] : [RelocationEquipmentApiTagEnum.RelocationEquipmentAttachmentList],
      query: ({ relocationEquipmentId }) => ({
        url: getRelocationEquipmentAttachmentListUrl(relocationEquipmentId),
        method: HttpMethodEnum.Get,
      }),
    }),

    getRelocationEquipmentTechnicalExamination: build.query<
      GetRelocationEquipmentTechnicalExaminationResponse,
      GetRelocationEquipmentTechnicalExaminationRequest
    >({
      query: ({ relocationEquipmentId }) => ({
        url: getRelocationEquipmentTechnicalExaminationUrl(relocationEquipmentId),
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
        url: createRelocationEquipmentTechnicalExaminationUrl(relocationEquipmentId),
        method: HttpMethodEnum.Post,
        data,
      }),
    }),
  }),
})

export const {
  useGetRelocationEquipmentAttachmentListQuery,
  useGetRelocationEquipmentTechnicalExaminationQuery,
  useCreateRelocationEquipmentTechnicalExaminationMutation,
} = relocationEquipmentApiService
