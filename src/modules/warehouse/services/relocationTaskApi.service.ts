import { getPaginatedList } from 'lib/antd/utils'

import { RelocationTaskApiEnum } from 'modules/warehouse/constants/relocationTask'
import {
  GetRelocationTaskListQueryArgs,
  GetRelocationTaskListSuccessResponse,
} from 'modules/warehouse/models'
import { GetRelocationTaskListTransformedSuccessResponse } from 'modules/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const relocationTaskApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getRelocationTaskList: build.query<
      GetRelocationTaskListTransformedSuccessResponse,
      GetRelocationTaskListQueryArgs
    >({
      query: (params) => ({
        url: RelocationTaskApiEnum.GetRelocationTaskList,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetRelocationTaskListSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
  }),
})

export const { useGetRelocationTaskListQuery } = relocationTaskApiService
