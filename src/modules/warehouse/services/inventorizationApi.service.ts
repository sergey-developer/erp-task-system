import { getPaginatedList } from 'lib/antd/utils'

import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'
import {
  CreateInventorizationMutationArgs,
  CreateInventorizationSuccessResponse,
  GetInventorizationsQueryArgs,
  GetInventorizationsSuccessResponse,
} from 'modules/warehouse/models'
import { GetInventorizationsTransformedSuccessResponse } from 'modules/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const inventorizationApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getInventorizations: build.query<
      GetInventorizationsTransformedSuccessResponse,
      MaybeUndefined<GetInventorizationsQueryArgs>
    >({
      query: (params) => ({
        url: InventorizationApiEnum.GetInventorizations,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetInventorizationsSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
    createInventorization: build.mutation<
      CreateInventorizationSuccessResponse,
      CreateInventorizationMutationArgs
    >({
      query: (data) => ({
        url: InventorizationApiEnum.CreateInventorization,
        method: HttpMethodEnum.Post,
        data,
      }),
    }),
  }),
})

export const { useGetInventorizationsQuery, useCreateInventorizationMutation } =
  inventorizationApiService
