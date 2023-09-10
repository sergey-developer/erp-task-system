import { WarehouseApiEnum } from 'modules/warehouse/constants'
import {
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse,
  GetWarehouseQueryArgs,
  GetWarehouseSuccessResponse,
} from 'modules/warehouse/models'
import { getWarehouseUrl } from 'modules/warehouse/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

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
    getWarehouse: build.query<
      GetWarehouseSuccessResponse,
      GetWarehouseQueryArgs
    >({
      query: (warehouseId) => ({
        url: getWarehouseUrl(warehouseId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWarehouseListQuery, useGetWarehouseQuery } =
  warehouseApiService
