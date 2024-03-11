import { RelocationEquipmentApiTagEnum } from 'modules/warehouse/constants/relocationEquipment'
import {
  CreateRelocationEquipmentTechnicalExaminationMutationArgs,
  CreateRelocationEquipmentTechnicalExaminationSuccessResponse,
  GetRelocationEquipmentAttachmentListQueryArgs,
  GetRelocationEquipmentAttachmentListSuccessResponse,
  GetRelocationEquipmentTechnicalExaminationQueryArgs,
  GetRelocationEquipmentTechnicalExaminationSuccessResponse,
} from 'modules/warehouse/models/relocationEquipment'
import {
  createRelocationEquipmentTechnicalExaminationUrl,
  getRelocationEquipmentAttachmentListUrl,
  getRelocationEquipmentTechnicalExaminationUrl,
} from 'modules/warehouse/utils/relocationEquipment'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const relocationEquipmentApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getRelocationEquipmentAttachmentList: build.query<
      GetRelocationEquipmentAttachmentListSuccessResponse,
      GetRelocationEquipmentAttachmentListQueryArgs
    >({
      providesTags: (result, error) =>
        error ? [] : [RelocationEquipmentApiTagEnum.RelocationEquipmentAttachmentList],
      query: ({ relocationEquipmentId }) => ({
        url: getRelocationEquipmentAttachmentListUrl(relocationEquipmentId),
        method: HttpMethodEnum.Get,
      }),
    }),
    getRelocationEquipmentTechnicalExamination: build.query<
      GetRelocationEquipmentTechnicalExaminationSuccessResponse,
      GetRelocationEquipmentTechnicalExaminationQueryArgs
    >({
      query: ({ relocationEquipmentId }) => ({
        url: getRelocationEquipmentTechnicalExaminationUrl(relocationEquipmentId),
        method: HttpMethodEnum.Get,
      }),
      transformResponse: (
        baseQueryReturnValue: GetRelocationEquipmentTechnicalExaminationSuccessResponse,
      ) => baseQueryReturnValue || undefined,
    }),
    createRelocationEquipmentTechnicalExamination: build.mutation<
      CreateRelocationEquipmentTechnicalExaminationSuccessResponse,
      CreateRelocationEquipmentTechnicalExaminationMutationArgs
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
