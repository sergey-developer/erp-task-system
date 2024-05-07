import { getPaginatedList } from 'lib/antd/utils'

import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'
import {
  GetInventorizationEquipmentsQueryArgs,
  GetInventorizationEquipmentsSuccessResponse,
  GetInventorizationQueryArgs,
  GetInventorizationsQueryArgs,
  GetInventorizationsSuccessResponse,
  GetInventorizationSuccessResponse,
} from 'modules/warehouse/models'
import {
  GetInventorizationEquipmentsTransformedSuccessResponse,
  GetInventorizationsTransformedSuccessResponse,
} from 'modules/warehouse/types'
import {
  getInventorizationEquipmentsUrl,
  getInventorizationUrl,
} from 'modules/warehouse/utils/inventorization'

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
    getInventorization: build.query<GetInventorizationSuccessResponse, GetInventorizationQueryArgs>(
      {
        query: ({ inventorizationId }) => ({
          url: getInventorizationUrl(inventorizationId),
          method: HttpMethodEnum.Get,
        }),
      },
    ),

    getInventorizationEquipments: build.query<
      GetInventorizationEquipmentsTransformedSuccessResponse,
      GetInventorizationEquipmentsQueryArgs
    >({
      query: ({ inventorizationId, ...params }) => ({
        url: getInventorizationEquipmentsUrl(inventorizationId),
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetInventorizationEquipmentsSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
  }),
})

export const {
  useGetInventorizationsQuery,
  useGetInventorizationQuery,
  useGetInventorizationEquipmentsQuery,
} = inventorizationApiService
