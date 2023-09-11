import { getPaginatedList } from 'lib/antd/utils'

import {
  NomenclatureApiEnum,
  NomenclatureApiTagEnum,
  NomenclatureApiTriggerEnum,
} from 'modules/warehouse/constants'
import {
  CreateNomenclatureMutationArgs,
  CreateNomenclatureSuccessResponse,
  GetNomenclatureListQueryArgs,
  GetNomenclatureListSuccessResponse,
  GetNomenclatureQueryArgs,
  GetNomenclatureSuccessResponse,
  UpdateNomenclatureMutationArgs,
  UpdateNomenclatureSuccessResponse,
} from 'modules/warehouse/models'
import { GetNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'
import { getNomenclatureUrl, updateNomenclatureUrl } from 'modules/warehouse/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const nomenclatureApiService = baseApiService
  .enhanceEndpoints({
    addTagTypes: [NomenclatureApiTagEnum.NomenclatureList],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      [NomenclatureApiTriggerEnum.GetNomenclatureList]: build.query<
        GetNomenclatureListTransformedSuccessResponse,
        GetNomenclatureListQueryArgs
      >({
        providesTags: [NomenclatureApiTagEnum.NomenclatureList],
        query: (params) => ({
          url: NomenclatureApiEnum.GetNomenclatureList,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetNomenclatureListSuccessResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      [NomenclatureApiTriggerEnum.GetNomenclature]: build.query<
        GetNomenclatureSuccessResponse,
        GetNomenclatureQueryArgs
      >({
        query: (id) => ({
          url: getNomenclatureUrl(id),
          method: HttpMethodEnum.Get,
        }),
      }),
      [NomenclatureApiTriggerEnum.CreateNomenclature]: build.mutation<
        CreateNomenclatureSuccessResponse,
        CreateNomenclatureMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [NomenclatureApiTagEnum.NomenclatureList],
        query: (payload) => ({
          url: NomenclatureApiEnum.CreateNomenclature,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      [NomenclatureApiTriggerEnum.UpdateNomenclature]: build.mutation<
        UpdateNomenclatureSuccessResponse,
        UpdateNomenclatureMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [NomenclatureApiTagEnum.NomenclatureList],
        query: ({ getListParams, id, ...payload }) => ({
          url: updateNomenclatureUrl(id),
          method: HttpMethodEnum.Patch,
          data: payload,
        }),
      }),
    }),
  })

export const {
  useCreateNomenclatureMutation,
  useUpdateNomenclatureMutation,
  useGetNomenclatureQuery,
  useGetNomenclatureListQuery,
} = nomenclatureApiService
