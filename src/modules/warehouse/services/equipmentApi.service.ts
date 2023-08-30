import { getPaginatedList } from 'lib/antd/utils'

import { EquipmentApiEnum } from 'modules/warehouse/constants'
import {
  GetEquipmentCategoryListQueryArgs,
  GetEquipmentCategoryListSuccessResponse,
  GetEquipmentListQueryArgs,
  GetEquipmentListSuccessResponse,
  GetEquipmentNomenclatureListQueryArgs,
  GetEquipmentNomenclatureListSuccessResponse,
  GetEquipmentQueryArgs,
  GetEquipmentSuccessResponse,
} from 'modules/warehouse/models'
import {
  GetEquipmentListTransformedSuccessResponse,
  GetEquipmentNomenclatureListTransformedSuccessResponse,
} from 'modules/warehouse/types'
import { getEquipmentUrl } from 'modules/warehouse/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const equipmentApiService = baseApiService.injectEndpoints({
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
      transformResponse: (response: GetEquipmentNomenclatureListSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
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
      transformResponse: (response: GetEquipmentListSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
    getEquipment: build.query<GetEquipmentSuccessResponse, GetEquipmentQueryArgs>({
      query: ({ equipmentId }) => ({
        url: getEquipmentUrl(equipmentId),
        method: HttpMethodEnum.Get,
      }),
    }),
    getEquipmentCategoryList: build.query<
      GetEquipmentCategoryListSuccessResponse,
      GetEquipmentCategoryListQueryArgs
    >({
      query: () => ({
        url: EquipmentApiEnum.GetEquipmentCategoryList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const {
  useGetEquipmentNomenclatureListQuery,

  useGetEquipmentQuery,
  useGetEquipmentListQuery,

  useGetEquipmentCategoryListQuery,
} = equipmentApiService
