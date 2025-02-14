import {
  EquipmentsEndpointsEnum,
  EquipmentsEndpointsTagsEnum,
} from 'features/equipments/api/constants'
import random from 'lodash/random'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { MaybeUndefined } from 'shared/types/utils'

import {
  makeGetEquipmentAttachmentsEndpoint,
  makeGetEquipmentEndpoint,
  makeGetEquipmentRelocationHistoryEndpoint,
  makeUpdateEquipmentEndpoint,
} from '../helpers'
import {
  CreateEquipmentRequest,
  CreateEquipmentResponse,
  CreateEquipmentsRequest,
  CreateEquipmentsResponse,
  CreateEquipmentTechnicalExaminationRequest,
  CreateEquipmentTechnicalExaminationResponse,
  GetEquipmentAttachmentsRequest,
  GetEquipmentAttachmentsResponse,
  GetEquipmentCategoriesRequest,
  GetEquipmentCategoriesResponse,
  GetEquipmentNomenclaturesRequest,
  GetEquipmentNomenclaturesResponse,
  GetEquipmentRelocationHistoryRequest,
  GetEquipmentRelocationHistoryResponse,
  GetEquipmentRequest,
  GetEquipmentResponse,
  GetEquipmentsCatalogRequest,
  GetEquipmentsCatalogResponse,
  GetEquipmentsRequest,
  GetEquipmentsResponse,
  GetEquipmentsTemplateRequest,
  GetEquipmentsTemplateResponse,
  GetEquipmentsXlsxRequest,
  GetEquipmentsXlsxResponse,
  ImportEquipmentsByFileRequest,
  ImportEquipmentsByFileResponse,
  UpdateEquipmentRequest,
  UpdateEquipmentResponse,
} from '../schemas'
import {
  GetEquipmentAttachmentsTransformedResponse,
  GetEquipmentNomenclaturesTransformedResponse,
  GetEquipmentsTransformedResponse,
  ImportEquipmentsByFileTransformedResponse,
} from '../types'

const equipmentsEndpoints = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      EquipmentsEndpointsTagsEnum.Equipments,
      EquipmentsEndpointsTagsEnum.Equipment,
      EquipmentsEndpointsTagsEnum.EquipmentsCatalog,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEquipmentNomenclatures: build.query<
        GetEquipmentNomenclaturesTransformedResponse,
        MaybeUndefined<GetEquipmentNomenclaturesRequest>
      >({
        query: (params) => ({
          url: EquipmentsEndpointsEnum.GetEquipmentNomenclatures,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetEquipmentNomenclaturesResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),

      getEquipmentsCatalog: build.query<
        GetEquipmentsCatalogResponse,
        MaybeUndefined<GetEquipmentsCatalogRequest>
      >({
        providesTags: (result, error) =>
          error ? [] : [EquipmentsEndpointsTagsEnum.EquipmentsCatalog],
        query: (params) => ({
          url: EquipmentsEndpointsEnum.GetEquipmentsCatalog,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      getEquipmentAttachments: build.query<
        GetEquipmentAttachmentsTransformedResponse,
        GetEquipmentAttachmentsRequest
      >({
        query: ({ equipmentId, ...params }) => ({
          url: makeGetEquipmentAttachmentsEndpoint(equipmentId),
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetEquipmentAttachmentsResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),

      getEquipments: build.query<GetEquipmentsTransformedResponse, GetEquipmentsRequest>({
        providesTags: (result, error) => (error ? [] : [EquipmentsEndpointsTagsEnum.Equipments]),
        query: (params) => ({
          url: EquipmentsEndpointsEnum.GetEquipments,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetEquipmentsResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      getEquipmentsXlsx: build.query<GetEquipmentsXlsxResponse, GetEquipmentsXlsxRequest>({
        query: (params) => ({
          url: EquipmentsEndpointsEnum.GetEquipments,
          method: HttpMethodEnum.Get,
          headers: { Accept: MimetypeEnum.Xlsx },
          params,
        }),
      }),
      getEquipmentRelocationHistory: build.query<
        GetEquipmentRelocationHistoryResponse,
        GetEquipmentRelocationHistoryRequest
      >({
        query: ({ equipmentId, ...params }) => ({
          url: makeGetEquipmentRelocationHistoryEndpoint(equipmentId),
          method: HttpMethodEnum.Get,
          params,
        }),
      }),
      getEquipment: build.query<GetEquipmentResponse, GetEquipmentRequest>({
        providesTags: (result, error) => (error ? [] : [EquipmentsEndpointsTagsEnum.Equipment]),
        query: ({ equipmentId }) => ({
          url: makeGetEquipmentEndpoint(equipmentId),
          method: HttpMethodEnum.Get,
        }),
      }),
      createEquipment: build.mutation<CreateEquipmentResponse, CreateEquipmentRequest>({
        invalidatesTags: (result, error) =>
          error ? [] : [EquipmentsEndpointsTagsEnum.EquipmentsCatalog],
        query: (payload) => ({
          url: EquipmentsEndpointsEnum.CreateEquipment,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      createEquipments: build.mutation<CreateEquipmentsResponse, CreateEquipmentsRequest>({
        invalidatesTags: (result, error) =>
          error ? [] : [EquipmentsEndpointsTagsEnum.EquipmentsCatalog],
        query: (payload) => ({
          url: EquipmentsEndpointsEnum.CreateEquipments,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      importEquipmentsByFile: build.mutation<
        ImportEquipmentsByFileTransformedResponse,
        ImportEquipmentsByFileRequest
      >({
        query: (payload) => {
          const formData = new FormData()
          formData.append('file', payload.file)

          return {
            url: EquipmentsEndpointsEnum.ImportEquipmentsByFile,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
        transformResponse: (response: ImportEquipmentsByFileResponse) =>
          response.map((eqp) => ({ ...eqp, rowId: random(1, 9999999) })),
      }),
      updateEquipment: build.mutation<UpdateEquipmentResponse, UpdateEquipmentRequest>({
        invalidatesTags: (result, error) =>
          error
            ? []
            : [EquipmentsEndpointsTagsEnum.Equipments, EquipmentsEndpointsTagsEnum.Equipment],
        query: ({ equipmentId, ...payload }) => ({
          url: makeUpdateEquipmentEndpoint(equipmentId),
          method: HttpMethodEnum.Put,
          data: payload,
        }),
      }),

      getEquipmentCategories: build.query<
        GetEquipmentCategoriesResponse,
        GetEquipmentCategoriesRequest
      >({
        query: () => ({
          url: EquipmentsEndpointsEnum.GetEquipmentCategories,
          method: HttpMethodEnum.Get,
        }),
      }),

      getEquipmentsTemplate: build.query<
        GetEquipmentsTemplateResponse,
        GetEquipmentsTemplateRequest
      >({
        query: () => ({
          url: EquipmentsEndpointsEnum.GetEquipmentsTemplate,
          method: HttpMethodEnum.Get,
        }),
      }),

      createEquipmentTechnicalExamination: build.mutation<
        CreateEquipmentTechnicalExaminationResponse,
        CreateEquipmentTechnicalExaminationRequest
      >({
        query: (data) => ({
          url: EquipmentsEndpointsEnum.CreateEquipmentTechnicalExamination,
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
    }),
  })

export const {
  useGetEquipmentNomenclaturesQuery,

  useGetEquipmentsCatalogQuery,
  useLazyGetEquipmentsCatalogQuery,

  useGetEquipmentAttachmentsQuery,

  useGetEquipmentQuery,
  useLazyGetEquipmentQuery,
  useCreateEquipmentMutation,
  useCreateEquipmentsMutation,
  useImportEquipmentsByFileMutation,
  useUpdateEquipmentMutation,
  useGetEquipmentsQuery,
  useLazyGetEquipmentsXlsxQuery,
  useGetEquipmentRelocationHistoryQuery,

  useGetEquipmentCategoriesQuery,

  useLazyGetEquipmentsTemplateQuery,

  useCreateEquipmentTechnicalExaminationMutation,
} = equipmentsEndpoints
