import { getPaginatedList } from 'lib/antd/utils'

import { EquipmentNomenclatureApiEnum } from 'modules/warehouse/constants'
import {
  GetEquipmentNomenclatureListQueryArgs,
  GetEquipmentNomenclatureListSuccessResponse,
} from 'modules/warehouse/models'
import { GetEquipmentNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const equipmentNomenclatureApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getEquipmentNomenclatureList: build.query<
      GetEquipmentNomenclatureListTransformedSuccessResponse,
      GetEquipmentNomenclatureListQueryArgs
    >({
      query: (params) => ({
        url: EquipmentNomenclatureApiEnum.GetEquipmentNomenclatureList,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (
        response: GetEquipmentNomenclatureListSuccessResponse,
        meta,
        arg,
      ) => getPaginatedList(response, arg),
    }),
  }),
})

export const { useGetEquipmentNomenclatureListQuery } =
  equipmentNomenclatureApiService
