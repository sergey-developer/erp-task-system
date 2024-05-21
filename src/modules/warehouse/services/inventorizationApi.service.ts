import { getPaginatedList } from 'lib/antd/utils'

import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'
import {
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
  }),
})

export const { useGetInventorizationsQuery, useGetInventorizationQuery } = inventorizationApiService
