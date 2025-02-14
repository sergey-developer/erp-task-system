import { WarehousesApiPathsEnum } from 'features/warehouse/constants/warehouse'
import {
  GetWarehouseListRequest,
  GetWarehouseListResponse,
  GetWarehouseRequest,
  GetWarehouseResponse,
} from 'features/warehouse/models'
import { getWarehouseUrl } from 'features/warehouse/utils/warehouse'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const warehouseApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWarehouseList: build.query<GetWarehouseListResponse, GetWarehouseListRequest>({
      query: (params) => ({
        url: WarehousesApiPathsEnum.GetWarehouseList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getWarehouse: build.query<GetWarehouseResponse, GetWarehouseRequest>({
      query: (warehouseId) => ({
        url: getWarehouseUrl(warehouseId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWarehouseListQuery, useGetWarehouseQuery } = warehouseApiService
