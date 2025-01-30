import { getPaginatedList } from 'lib/antd/utils'

import {
  InventorizationApiEnum,
  InventorizationApiTagEnum,
} from 'features/warehouse/constants/inventorization'
import {
  CheckInventorizationEquipmentsMutationArgs,
  CheckInventorizationEquipmentsSuccessResponse,
  CheckInventorizationEquipmentsTemplateMutationArgs,
  CheckInventorizationEquipmentsTemplateSuccessResponse,
  CompleteInventorizationMutationArgs,
  CompleteInventorizationSuccessResponse,
  CreateInventorizationEquipmentMutationArgs,
  CreateInventorizationEquipmentSuccessResponse,
  CreateInventorizationMutationArgs,
  CreateInventorizationSuccessResponse,
  GetInventorizationEquipmentQueryArgs,
  GetInventorizationEquipmentsQueryArgs,
  GetInventorizationEquipmentsSuccessResponse,
  GetInventorizationEquipmentsTemplateQueryArgs,
  GetInventorizationEquipmentsTemplateSuccessResponse,
  GetInventorizationEquipmentSuccessResponse,
  GetInventorizationEquipmentsXlsxQueryArgs,
  GetInventorizationEquipmentsXlsxSuccessResponse,
  GetInventorizationQueryArgs,
  GetInventorizationsQueryArgs,
  GetInventorizationsSuccessResponse,
  GetInventorizationSuccessResponse,
  UpdateInventorizationEquipmentMutationArgs,
  UpdateInventorizationEquipmentSuccessResponse,
} from 'features/warehouse/models'
import {
  GetInventorizationEquipmentsTemplateTransformedSuccessResponse,
  GetInventorizationEquipmentsTransformedSuccessResponse,
  GetInventorizationEquipmentsXlsxTransformedSuccessResponse,
  GetInventorizationsTransformedSuccessResponse,
} from 'features/warehouse/types'
import {
  makeCompleteInventorizationUrl,
  makeCreateInventorizationEquipmentUrl,
  makeGetInventorizationEquipmentsUrl,
  makeGetInventorizationEquipmentUrl,
  makeGetInventorizationUrl,
  makeUpdateInventorizationEquipmentUrl,
} from 'features/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { baseApiService } from 'shared/api/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const inventorizationApiService = baseApiService
  .enhanceEndpoints({
    addTagTypes: [
      InventorizationApiTagEnum.Inventorizations,
      InventorizationApiTagEnum.InventorizationEquipments,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getInventorizations: build.query<
        GetInventorizationsTransformedSuccessResponse,
        MaybeUndefined<GetInventorizationsQueryArgs>
      >({
        providesTags: (result, error) =>
          error ? [] : [InventorizationApiTagEnum.Inventorizations],
        query: (params) => ({
          url: InventorizationApiEnum.GetInventorizations,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetInventorizationsSuccessResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      getInventorization: build.query<
        GetInventorizationSuccessResponse,
        GetInventorizationQueryArgs
      >({
        query: ({ inventorizationId }) => ({
          url: makeGetInventorizationUrl({ inventorizationId }),
          method: HttpMethodEnum.Get,
        }),
      }),
      createInventorization: build.mutation<
        CreateInventorizationSuccessResponse,
        CreateInventorizationMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [InventorizationApiTagEnum.Inventorizations],
        query: (data) => ({
          url: InventorizationApiEnum.CreateInventorization,
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
      completeInventorization: build.mutation<
        CompleteInventorizationSuccessResponse,
        CompleteInventorizationMutationArgs
      >({
        query: ({ inventorizationId }) => ({
          url: makeCompleteInventorizationUrl({ inventorizationId }),
          method: HttpMethodEnum.Post,
        }),
      }),

      getInventorizationEquipments: build.query<
        GetInventorizationEquipmentsTransformedSuccessResponse,
        GetInventorizationEquipmentsQueryArgs
      >({
        providesTags: (result, error) =>
          error ? [] : [InventorizationApiTagEnum.InventorizationEquipments],
        query: ({ inventorizationId, ...params }) => ({
          url: makeGetInventorizationEquipmentsUrl({ inventorizationId }),
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetInventorizationEquipmentsSuccessResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      getInventorizationEquipmentsXlsx: build.query<
        GetInventorizationEquipmentsXlsxTransformedSuccessResponse,
        GetInventorizationEquipmentsXlsxQueryArgs
      >({
        query: ({ inventorizationId, ...params }) => ({
          url: makeGetInventorizationEquipmentsUrl({ inventorizationId }),
          method: HttpMethodEnum.Get,
          headers: { Accept: MimetypeEnum.Xlsx },
          params,
        }),
        transformResponse: (value: GetInventorizationEquipmentsXlsxSuccessResponse, meta) => ({
          value,
          meta,
        }),
      }),
      getInventorizationEquipment: build.query<
        GetInventorizationEquipmentSuccessResponse,
        GetInventorizationEquipmentQueryArgs
      >({
        query: ({ equipmentId }) => ({
          url: makeGetInventorizationEquipmentUrl({ equipmentId }),
          method: HttpMethodEnum.Get,
        }),
      }),
      createInventorizationEquipment: build.mutation<
        CreateInventorizationEquipmentSuccessResponse,
        CreateInventorizationEquipmentMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [InventorizationApiTagEnum.InventorizationEquipments],
        query: ({ inventorizationId, ...data }) => ({
          url: makeCreateInventorizationEquipmentUrl({ inventorizationId }),
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
      updateInventorizationEquipment: build.mutation<
        UpdateInventorizationEquipmentSuccessResponse,
        UpdateInventorizationEquipmentMutationArgs
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
              baseApiService.util.updateQueryData(
                'getInventorizationEquipments' as never,
                getInventorizationEquipmentsArgs as never,
                (data: GetInventorizationEquipmentsTransformedSuccessResponse) => {
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
        GetInventorizationEquipmentsTemplateTransformedSuccessResponse,
        GetInventorizationEquipmentsTemplateQueryArgs
      >({
        query: () => ({
          url: InventorizationApiEnum.GetInventorizationEquipmentsTemplate,
          method: HttpMethodEnum.Get,
        }),
        transformResponse: (value: GetInventorizationEquipmentsTemplateSuccessResponse, meta) => ({
          value,
          meta,
        }),
      }),
      checkInventorizationEquipmentsTemplate: build.mutation<
        CheckInventorizationEquipmentsTemplateSuccessResponse,
        CheckInventorizationEquipmentsTemplateMutationArgs
      >({
        query: ({ file, inventorization }) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('inventorization', String(inventorization))

          return {
            url: InventorizationApiEnum.CheckInventorizationEquipmentsTemplate,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),
      checkInventorizationEquipments: build.mutation<
        CheckInventorizationEquipmentsSuccessResponse,
        CheckInventorizationEquipmentsMutationArgs
      >({
        query: (data) => ({
          url: InventorizationApiEnum.CheckInventorizationEquipments,
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
} = inventorizationApiService
