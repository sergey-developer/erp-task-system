import { WarehouseApiEnum } from 'modules/warehouse/constants'
import {
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const warehouseApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getWarehouseList: build.query<
      GetWarehouseListSuccessResponse,
      GetWarehouseListQueryArgs
    >({
      query: (params) => ({
        url: WarehouseApiEnum.GetWarehouseList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetWarehouseListQuery } = warehouseApiService
