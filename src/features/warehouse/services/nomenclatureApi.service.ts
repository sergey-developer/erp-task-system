import {
  NomenclatureApiEnum,
  NomenclatureApiTagEnum,
  NomenclatureApiTriggerEnum,
} from 'features/warehouse/constants/nomenclature'
import {
  CreateNomenclatureMutationArgs,
  CreateNomenclatureSuccessResponse,
  GetNomenclatureListQueryArgs,
  GetNomenclatureListSuccessResponse,
  GetNomenclatureQueryArgs,
  GetNomenclatureSuccessResponse,
  UpdateNomenclatureMutationArgs,
  UpdateNomenclatureSuccessResponse,
} from 'features/warehouse/models'
import { GetNomenclatureListTransformedSuccessResponse } from 'features/warehouse/types'
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
        GetNomenclatureListTransformedSuccessResponse,
        GetNomenclatureListQueryArgs
      >({
        providesTags: (result, error) => (error ? [] : [NomenclatureApiTagEnum.Nomenclatures]),
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
        invalidatesTags: (result, error) => (error ? [] : [NomenclatureApiTagEnum.Nomenclatures]),
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
