import { WarehousesApiPathsEnum } from 'features/warehouses/api/constants'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import { makeGetWarehouseApiPath } from '../helpers'
import {
  GetWarehouseRequest,
  GetWarehouseResponse,
  GetWarehousesRequest,
  GetWarehousesResponse,
} from '../schemas'

const warehousesEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWarehouses: build.query<GetWarehousesResponse, GetWarehousesRequest>({
      query: (params) => ({
        url: WarehousesApiPathsEnum.GetWarehouses,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getWarehouse: build.query<GetWarehouseResponse, GetWarehouseRequest>({
      query: (warehouseId) => ({
        url: makeGetWarehouseApiPath(warehouseId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWarehousesQuery, useGetWarehouseQuery } = warehousesEndpoints
