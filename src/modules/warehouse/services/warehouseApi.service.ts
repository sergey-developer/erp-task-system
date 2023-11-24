import { WarehouseApiEnum } from 'modules/warehouse/constants/warehouse'
import {
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse,
  GetWarehouseMyQueryArgs,
  GetWarehouseMySuccessResponse,
  GetWarehouseQueryArgs,
  GetWarehouseSuccessResponse,
} from 'modules/warehouse/models'
import { getWarehouseUrl } from 'modules/warehouse/utils/warehouse'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

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
    getWarehouseMy: build.query<GetWarehouseMySuccessResponse, GetWarehouseMyQueryArgs>({
      query: () => ({
        url: WarehouseApiEnum.GetWarehouseMy,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWarehouseListQuery, useGetWarehouseQuery, useGetWarehouseMyQuery } =
  warehouseApiService
