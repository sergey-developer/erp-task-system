import { getPaginatedList } from 'lib/antd/utils'

import { EquipmentApiEnum } from 'modules/warehouse/constants'
import {
  GetEquipmentListQueryArgs,
  GetEquipmentListSuccessResponse,
  GetEquipmentNomenclatureListQueryArgs,
  GetEquipmentNomenclatureListSuccessResponse,
} from 'modules/warehouse/models'
import {
  GetEquipmentListTransformedSuccessResponse,
  GetEquipmentNomenclatureListTransformedSuccessResponse,
} from 'modules/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const equipmentNomenclatureApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getEquipmentNomenclatureList: build.query<
      GetEquipmentNomenclatureListTransformedSuccessResponse,
      GetEquipmentNomenclatureListQueryArgs
    >({
      query: (params) => ({
        url: EquipmentApiEnum.GetEquipmentNomenclatureList,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (
        response: GetEquipmentNomenclatureListSuccessResponse,
        meta,
        arg,
      ) => getPaginatedList(response, arg),
    }),
    getEquipmentList: build.query<
      GetEquipmentListTransformedSuccessResponse,
      GetEquipmentListQueryArgs
    >({
      query: (params) => ({
        url: EquipmentApiEnum.GetEquipmentList,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (
        response: GetEquipmentListSuccessResponse,
        meta,
        arg,
      ) => getPaginatedList(response, arg),
    }),
  }),
})

export const {
  useGetEquipmentNomenclatureListQuery,
  useGetEquipmentListQuery,
} = equipmentNomenclatureApiService
