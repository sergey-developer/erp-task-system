import { WarehouseApiEnum } from 'features/warehouse/constants/warehouse'
import {
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse,
  GetWarehouseQueryArgs,
  GetWarehouseSuccessResponse,
} from 'features/warehouse/models'
import { getWarehouseUrl } from 'features/warehouse/utils/warehouse'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/api/services/baseApi'

const warehouseApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getWarehouseList: build.query<GetWarehouseListSuccessResponse, GetWarehouseListQueryArgs>({
      query: (params) => ({
        url: WarehouseApiEnum.GetWarehouseList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getWarehouse: build.query<GetWarehouseSuccessResponse, GetWarehouseQueryArgs>({
      query: (warehouseId) => ({
        url: getWarehouseUrl(warehouseId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWarehouseListQuery, useGetWarehouseQuery } = warehouseApiService
