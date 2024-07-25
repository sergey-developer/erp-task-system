import { getPaginatedList } from 'lib/antd/utils'

import {
  InventorizationApiEnum,
  InventorizationApiTagEnum,
} from 'modules/warehouse/constants/inventorization'
import {
  CompleteInventorizationMutationArgs,
  CompleteInventorizationSuccessResponse,
  CreateInventorizationEquipmentMutationArgs,
  CreateInventorizationEquipmentSuccessResponse,
  CreateInventorizationMutationArgs,
  CreateInventorizationSuccessResponse,
  GetInventorizationEquipmentsQueryArgs,
  GetInventorizationEquipmentsSuccessResponse,
  GetInventorizationQueryArgs,
  GetInventorizationsQueryArgs,
  GetInventorizationsSuccessResponse,
  GetInventorizationSuccessResponse,
  UpdateInventorizationEquipmentMutationArgs,
  UpdateInventorizationEquipmentSuccessResponse,
} from 'modules/warehouse/models'
import {
  GetInventorizationEquipmentsTransformedSuccessResponse,
  GetInventorizationsTransformedSuccessResponse,
} from 'modules/warehouse/types'
import {
  makeCompleteInventorizationUrl,
  makeCreateInventorizationEquipmentUrl,
  makeGetInventorizationEquipmentsUrl,
  makeGetInventorizationUrl,
  makeUpdateInventorizationEquipmentUrl,
} from 'modules/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'
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
        query: ({ inventorizationEquipmentId, getInventorizationEquipmentsArgs, ...data }) => ({
          url: makeUpdateInventorizationEquipmentUrl({ inventorizationEquipmentId }),
          method: HttpMethodEnum.Put,
          data,
        }),
        onQueryStarted: async (
          { inventorizationEquipmentId, getInventorizationEquipmentsArgs },
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
                    inventorizationEquipment.isFilled = !!updateResult.isFilled
                    inventorizationEquipment.hasDiff = !!updateResult.hasDiff
                  }
                },
              ),
            )
          } catch {}
        },
      }),
    }),
  })

export const {
  useGetInventorizationsQuery,
  useGetInventorizationQuery,
  useCreateInventorizationMutation,
  useCompleteInventorizationMutation,
  useGetInventorizationEquipmentsQuery,
  useCreateInventorizationEquipmentMutation,
  useUpdateInventorizationEquipmentMutation,
} = inventorizationApiService
