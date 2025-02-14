import {
  NomenclatureApiEnum,
  NomenclatureApiTagEnum,
  NomenclatureApiTriggerEnum,
} from 'features/warehouse/constants/nomenclature'
import {
  CreateNomenclatureRequest,
  CreateNomenclatureResponse,
  GetNomenclatureListRequest,
  GetNomenclatureListResponse,
  GetNomenclatureRequest,
  GetNomenclatureResponse,
  UpdateNomenclatureRequest,
  UpdateNomenclatureResponse,
} from 'features/warehouse/models'
import { GetNomenclatureListTransformedResponse } from 'features/warehouse/types'
import { getNomenclatureUrl, updateNomenclatureUrl } from 'features/warehouse/utils/nomenclature'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const nomenclatureApiService = baseApi
  .enhanceEndpoints({
    addTagTypes: [NomenclatureApiTagEnum.Nomenclatures],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      [NomenclatureApiTriggerEnum.GetNomenclatureList]: build.query<
        GetNomenclatureListTransformedResponse,
        GetNomenclatureListRequest
      >({
        providesTags: (result, error) => (error ? [] : [NomenclatureApiTagEnum.Nomenclatures]),
        query: (params) => ({
          url: NomenclatureApiEnum.GetNomenclatureList,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetNomenclatureListResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      [NomenclatureApiTriggerEnum.GetNomenclature]: build.query<
        GetNomenclatureResponse,
        GetNomenclatureRequest
      >({
        query: (id) => ({
          url: getNomenclatureUrl(id),
          method: HttpMethodEnum.Get,
        }),
      }),
      [NomenclatureApiTriggerEnum.CreateNomenclature]: build.mutation<
        CreateNomenclatureResponse,
        CreateNomenclatureRequest
      >({
        invalidatesTags: (result, error) => (error ? [] : [NomenclatureApiTagEnum.Nomenclatures]),
        query: (payload) => ({
          url: NomenclatureApiEnum.CreateNomenclature,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      [NomenclatureApiTriggerEnum.UpdateNomenclature]: build.mutation<
        UpdateNomenclatureResponse,
        UpdateNomenclatureRequest
      >({
        invalidatesTags: (result, error) => (error ? [] : [NomenclatureApiTagEnum.Nomenclatures]),
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
