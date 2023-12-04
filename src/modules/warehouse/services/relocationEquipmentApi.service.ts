import { RelocationEquipmentApiTagEnum } from 'modules/warehouse/constants/relocationEquipment'
import {
  GetRelocationEquipmentAttachmentListQueryArgs,
  GetRelocationEquipmentAttachmentListSuccessResponse,
} from 'modules/warehouse/models/relocationEquipment'
import { getRelocationEquipmentAttachmentListUrl } from 'modules/warehouse/utils/relocationEquipment'

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
  }),
})

export const { useGetRelocationEquipmentAttachmentListQuery } = relocationEquipmentApiService
