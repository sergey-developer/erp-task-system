import { getPaginatedList } from 'lib/antd/utils'

import {
  InventorizationApiEnum,
  InventorizationApiTagEnum,
} from 'modules/warehouse/constants/inventorization'
import {
  CreateInventorizationMutationArgs,
  CreateInventorizationSuccessResponse,
  GetInventorizationQueryArgs,
  GetInventorizationsQueryArgs,
  GetInventorizationsSuccessResponse,
  GetInventorizationSuccessResponse,
} from 'modules/warehouse/models'
import { GetInventorizationsTransformedSuccessResponse } from 'modules/warehouse/types'
import { getInventorizationUrl } from 'modules/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const inventorizationApiService = baseApiService
  .enhanceEndpoints({
    addTagTypes: [InventorizationApiTagEnum.Inventorizations],
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
      getInventorization: build.query<GetInventorizationSuccessResponse, GetInventorizationQueryArgs>(
        {
          query: ({ inventorizationId }) => ({
            url: getInventorizationUrl(inventorizationId),
            method: HttpMethodEnum.Get,
          }),
        },
      ),
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
    }),
  })

export const { useGetInventorizationsQuery, useGetInventorizationQuery, useCreateInventorizationMutation } =
  inventorizationApiService
