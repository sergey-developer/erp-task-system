import { WarehouseApiEnum } from 'modules/warehouse/constants'
import {
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/interfaces/utils'
import { baseApiService } from 'shared/services/api'

const warehouseApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getWarehouseList: build.query<
      GetWarehouseListSuccessResponse,
      MaybeUndefined<GetWarehouseListQueryArgs>
    >({
      query: (params) => ({
        url: WarehouseApiEnum.GetWarehouseList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetWarehouseListQuery } = warehouseApiService
