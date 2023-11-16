import { getPaginatedList } from 'lib/antd/utils'

import { EquipmentApiEnum, EquipmentApiTagEnum } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentMutationArgs,
  CreateEquipmentSuccessResponse,
  GetEquipmentAttachmentListQueryArgs,
  GetEquipmentAttachmentListSuccessResponse,
  GetEquipmentCatalogListQueryArgs,
  GetEquipmentCatalogListSuccessResponse,
  GetEquipmentCategoryListQueryArgs,
  GetEquipmentCategoryListSuccessResponse,
  GetEquipmentListQueryArgs,
  GetEquipmentListSuccessResponse,
  GetEquipmentListTemplateQueryArgs,
  GetEquipmentListTemplateSuccessResponse,
  GetEquipmentNomenclatureListQueryArgs,
  GetEquipmentNomenclatureListSuccessResponse,
  GetEquipmentQueryArgs,
  GetEquipmentRelocationHistoryQueryArgs,
  GetEquipmentRelocationHistorySuccessResponse,
  GetEquipmentSuccessResponse,
  UpdateEquipmentMutationArgs,
  UpdateEquipmentSuccessResponse,
} from 'modules/warehouse/models'
import {
  GetEquipmentAttachmentListTransformedSuccessResponse,
  GetEquipmentListTransformedSuccessResponse,
  GetEquipmentNomenclatureListTransformedSuccessResponse,
} from 'modules/warehouse/types'
import {
  getEquipmentRelocationHistoryUrl,
  getEquipmentAttachmentListUrl,
  getEquipmentUrl,
  updateEquipmentUrl,
} from 'modules/warehouse/utils/equipment'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const equipmentApiService = baseApiService
  .enhanceEndpoints({
    addTagTypes: [
      EquipmentApiTagEnum.EquipmentList,
      EquipmentApiTagEnum.Equipment,
      EquipmentApiTagEnum.EquipmentCatalogList,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEquipmentNomenclatureList: build.query<
        GetEquipmentNomenclatureListTransformedSuccessResponse,
        GetEquipmentNomenclatureListQueryArgs
      >({
        query: (params) => ({
          url: EquipmentApiEnum.GetEquipmentNomenclatureList,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetEquipmentNomenclatureListSuccessResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),

      getEquipmentCatalogList: build.query<
        GetEquipmentCatalogListSuccessResponse,
        MaybeUndefined<GetEquipmentCatalogListQueryArgs>
      >({
        providesTags: (result, error) => (error ? [] : [EquipmentApiTagEnum.EquipmentCatalogList]),
        query: (params) => ({
          url: EquipmentApiEnum.GetEquipmentCatalogList,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      getEquipmentAttachmentList: build.query<
        GetEquipmentAttachmentListTransformedSuccessResponse,
        GetEquipmentAttachmentListQueryArgs
      >({
        query: ({ equipmentId, ...params }) => ({
          url: getEquipmentAttachmentListUrl(equipmentId),
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetEquipmentAttachmentListSuccessResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),

      getEquipmentList: build.query<
        GetEquipmentListTransformedSuccessResponse,
        GetEquipmentListQueryArgs
      >({
        providesTags: (result, error) => (error ? [] : [EquipmentApiTagEnum.EquipmentList]),
        query: (params) => ({
          url: EquipmentApiEnum.GetEquipmentList,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetEquipmentListSuccessResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      getEquipmentRelocationHistory: build.query<
        GetEquipmentRelocationHistorySuccessResponse,
        GetEquipmentRelocationHistoryQueryArgs
      >({
        query: ({ equipmentId, ...params }) => ({
          url: getEquipmentRelocationHistoryUrl(equipmentId),
          method: HttpMethodEnum.Get,
          params,
        }),
      }),
      getEquipment: build.query<GetEquipmentSuccessResponse, GetEquipmentQueryArgs>({
        providesTags: (result, error) => (error ? [] : [EquipmentApiTagEnum.Equipment]),
        query: ({ equipmentId }) => ({
          url: getEquipmentUrl(equipmentId),
          method: HttpMethodEnum.Get,
        }),
      }),
      createEquipment: build.mutation<CreateEquipmentSuccessResponse, CreateEquipmentMutationArgs>({
        invalidatesTags: (result, error) =>
          error ? [] : [EquipmentApiTagEnum.EquipmentCatalogList],
        query: (payload) => ({
          url: EquipmentApiEnum.CreateEquipment,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      updateEquipment: build.mutation<UpdateEquipmentSuccessResponse, UpdateEquipmentMutationArgs>({
        invalidatesTags: (result, error) =>
          error ? [] : [EquipmentApiTagEnum.EquipmentList, EquipmentApiTagEnum.Equipment],
        query: ({ equipmentId, ...payload }) => ({
          url: updateEquipmentUrl(equipmentId),
          method: HttpMethodEnum.Put,
          data: payload,
        }),
      }),

      getEquipmentCategoryList: build.query<
        GetEquipmentCategoryListSuccessResponse,
        GetEquipmentCategoryListQueryArgs
      >({
        query: () => ({
          url: EquipmentApiEnum.GetEquipmentCategoryList,
          method: HttpMethodEnum.Get,
        }),
      }),

      getEquipmentListTemplate: build.query<
        GetEquipmentListTemplateSuccessResponse,
        GetEquipmentListTemplateQueryArgs
      >({
        query: () => ({
          url: EquipmentApiEnum.GetEquipmentListTemplate,
          method: HttpMethodEnum.Get,
        }),
      }),
    }),
  })

export const {
  useGetEquipmentNomenclatureListQuery,

  useGetEquipmentCatalogListQuery,

  useGetEquipmentAttachmentListQuery,

  useGetEquipmentQuery,
  useLazyGetEquipmentQuery,
  useCreateEquipmentMutation,
  useUpdateEquipmentMutation,
  useGetEquipmentListQuery,
  useGetEquipmentRelocationHistoryQuery,

  useGetEquipmentCategoryListQuery,

  useLazyGetEquipmentListTemplateQuery,
} = equipmentApiService
