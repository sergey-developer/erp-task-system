import {
  makeCompleteInventorizationUrl,
  makeCreateInventorizationEquipmentUrl,
  makeGetInventorizationEquipmentsUrl,
  makeGetInventorizationEquipmentUrl,
  makeGetInventorizationUrl,
  makeUpdateInventorizationEquipmentUrl,
} from 'features/warehouse/utils/inventorization'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { MaybeUndefined } from 'shared/types/utils'

import { InventorizationsEndpointsEnum, InventorizationsEndpointsTagsEnum } from '../constants'
import {
  CheckInventorizationEquipmentsRequest,
  CheckInventorizationEquipmentsResponse,
  CheckInventorizationEquipmentsTemplateRequest,
  CheckInventorizationEquipmentsTemplateResponse,
  CompleteInventorizationRequest,
  CompleteInventorizationResponse,
  CreateInventorizationEquipmentRequest,
  CreateInventorizationEquipmentResponse,
  CreateInventorizationRequest,
  CreateInventorizationResponse,
  GetInventorizationEquipmentRequest,
  GetInventorizationEquipmentResponse,
  GetInventorizationEquipmentsRequest,
  GetInventorizationEquipmentsResponse,
  GetInventorizationEquipmentsTemplateRequest,
  GetInventorizationEquipmentsTemplateResponse,
  GetInventorizationEquipmentsXlsxRequest,
  GetInventorizationEquipmentsXlsxResponse,
  GetInventorizationRequest,
  GetInventorizationResponse,
  GetInventorizationsRequest,
  GetInventorizationsResponse,
  UpdateInventorizationEquipmentRequest,
  UpdateInventorizationEquipmentResponse,
} from '../schemas'
import {
  GetInventorizationEquipmentsTemplateTransformedResponse,
  GetInventorizationEquipmentsTransformedResponse,
  GetInventorizationEquipmentsXlsxTransformedResponse,
  GetInventorizationsTransformedResponse,
} from '../types'

const inventorizationsEndpoints = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      InventorizationsEndpointsTagsEnum.Inventorizations,
      InventorizationsEndpointsTagsEnum.InventorizationEquipments,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getInventorizations: build.query<
        GetInventorizationsTransformedResponse,
        MaybeUndefined<GetInventorizationsRequest>
      >({
        providesTags: (result, error) =>
          error ? [] : [InventorizationsEndpointsTagsEnum.Inventorizations],
        query: (params) => ({
          url: InventorizationsEndpointsEnum.GetInventorizations,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetInventorizationsResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      getInventorization: build.query<GetInventorizationResponse, GetInventorizationRequest>({
        query: ({ inventorizationId }) => ({
          url: makeGetInventorizationUrl({ inventorizationId }),
          method: HttpMethodEnum.Get,
        }),
      }),
      createInventorization: build.mutation<
        CreateInventorizationResponse,
        CreateInventorizationRequest
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [InventorizationsEndpointsTagsEnum.Inventorizations],
        query: (data) => ({
          url: InventorizationsEndpointsEnum.CreateInventorization,
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
      completeInventorization: build.mutation<
        CompleteInventorizationResponse,
        CompleteInventorizationRequest
      >({
        query: ({ inventorizationId }) => ({
          url: makeCompleteInventorizationUrl({ inventorizationId }),
          method: HttpMethodEnum.Post,
        }),
      }),

      getInventorizationEquipments: build.query<
        GetInventorizationEquipmentsTransformedResponse,
        GetInventorizationEquipmentsRequest
      >({
        providesTags: (result, error) =>
          error ? [] : [InventorizationsEndpointsTagsEnum.InventorizationEquipments],
        query: ({ inventorizationId, ...params }) => ({
          url: makeGetInventorizationEquipmentsUrl({ inventorizationId }),
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetInventorizationEquipmentsResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      getInventorizationEquipmentsXlsx: build.query<
        GetInventorizationEquipmentsXlsxTransformedResponse,
        GetInventorizationEquipmentsXlsxRequest
      >({
        query: ({ inventorizationId, ...params }) => ({
          url: makeGetInventorizationEquipmentsUrl({ inventorizationId }),
          method: HttpMethodEnum.Get,
          headers: { Accept: MimetypeEnum.Xlsx },
          params,
        }),
        transformResponse: (value: GetInventorizationEquipmentsXlsxResponse, meta) => ({
          value,
          meta,
        }),
      }),
      getInventorizationEquipment: build.query<
        GetInventorizationEquipmentResponse,
        GetInventorizationEquipmentRequest
      >({
        query: ({ equipmentId }) => ({
          url: makeGetInventorizationEquipmentUrl({ equipmentId }),
          method: HttpMethodEnum.Get,
        }),
      }),
      createInventorizationEquipment: build.mutation<
        CreateInventorizationEquipmentResponse,
        CreateInventorizationEquipmentRequest
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [InventorizationsEndpointsTagsEnum.InventorizationEquipments],
        query: ({ inventorizationId, ...data }) => ({
          url: makeCreateInventorizationEquipmentUrl({ inventorizationId }),
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
      updateInventorizationEquipment: build.mutation<
        UpdateInventorizationEquipmentResponse,
        UpdateInventorizationEquipmentRequest
      >({
        query: ({
          inventorizationEquipmentId,
          getInventorizationEquipmentsArgs,
          locationFactOption,
          ...data
        }) => ({
          url: makeUpdateInventorizationEquipmentUrl({ inventorizationEquipmentId }),
          method: HttpMethodEnum.Put,
          data,
        }),
        onQueryStarted: async (
          {
            inventorizationEquipmentId,
            locationFactOption,
            quantityFact,
            isLocationFactUndefined,
            getInventorizationEquipmentsArgs,
          },
          { dispatch, queryFulfilled },
        ) => {
          try {
            const { data: updateResult } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                'getInventorizationEquipments' as never,
                getInventorizationEquipmentsArgs as never,
                (data: GetInventorizationEquipmentsTransformedResponse) => {
                  const inventorizationEquipment = data.results.find(
                    (item) => item.id === inventorizationEquipmentId,
                  )

                  if (inventorizationEquipment) {
                    inventorizationEquipment.locationFact = locationFactOption
                    inventorizationEquipment.isLocationFactUndefined = isLocationFactUndefined
                    inventorizationEquipment.quantity.fact = quantityFact
                    inventorizationEquipment.isFilled = !!updateResult.isFilled
                    inventorizationEquipment.hasDiff = !!updateResult.hasDiff
                  }
                },
              ),
            )
          } catch {}
        },
      }),
      getInventorizationEquipmentsTemplate: build.query<
        GetInventorizationEquipmentsTemplateTransformedResponse,
        GetInventorizationEquipmentsTemplateRequest
      >({
        query: () => ({
          url: InventorizationsEndpointsEnum.GetInventorizationEquipmentsTemplate,
          method: HttpMethodEnum.Get,
        }),
        transformResponse: (value: GetInventorizationEquipmentsTemplateResponse, meta) => ({
          value,
          meta,
        }),
      }),
      checkInventorizationEquipmentsTemplate: build.mutation<
        CheckInventorizationEquipmentsTemplateResponse,
        CheckInventorizationEquipmentsTemplateRequest
      >({
        query: ({ file, inventorization }) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('inventorization', String(inventorization))

          return {
            url: InventorizationsEndpointsEnum.CheckInventorizationEquipmentsTemplate,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),
      checkInventorizationEquipments: build.mutation<
        CheckInventorizationEquipmentsResponse,
        CheckInventorizationEquipmentsRequest
      >({
        query: (data) => ({
          url: InventorizationsEndpointsEnum.CheckInventorizationEquipments,
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
    }),
  })

export const {
  useGetInventorizationsQuery,
  useGetInventorizationQuery,
  useCreateInventorizationMutation,
  useCompleteInventorizationMutation,
  useGetInventorizationEquipmentQuery,
  useLazyGetInventorizationEquipmentQuery,
  useGetInventorizationEquipmentsQuery,
  useLazyGetInventorizationEquipmentsXlsxQuery,
  useLazyGetInventorizationEquipmentsTemplateQuery,
  useCheckInventorizationEquipmentsTemplateMutation,
  useCheckInventorizationEquipmentsMutation,
  useCreateInventorizationEquipmentMutation,
  useUpdateInventorizationEquipmentMutation,
} = inventorizationsEndpoints
