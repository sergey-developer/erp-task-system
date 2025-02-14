import {
  NomenclaturesEndpointsEnum,
  NomenclaturesEndpointsNamesEnum,
  NomenclaturesEndpointsTagsEnum,
} from 'features/nomenclatures/api/constants'
import { GetNomenclaturesTransformedResponse } from 'features/warehouse/types'
import { getNomenclatureUrl, updateNomenclatureUrl } from 'features/warehouse/utils/nomenclature'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  CreateNomenclatureRequest,
  CreateNomenclatureResponse,
  GetNomenclatureListResponse,
  GetNomenclatureRequest,
  GetNomenclatureResponse,
  GetNomenclaturesRequest,
  UpdateNomenclatureRequest,
  UpdateNomenclatureResponse,
} from '../schemas'

const nomenclaturesEndpoints = baseApi
  .enhanceEndpoints({
    addTagTypes: [NomenclaturesEndpointsTagsEnum.Nomenclatures],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      [NomenclaturesEndpointsNamesEnum.GetNomenclatures]: build.query<
        GetNomenclaturesTransformedResponse,
        GetNomenclaturesRequest
      >({
        providesTags: (result, error) =>
          error ? [] : [NomenclaturesEndpointsTagsEnum.Nomenclatures],
        query: (params) => ({
          url: NomenclaturesEndpointsEnum.GetNomenclatures,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetNomenclatureListResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      [NomenclaturesEndpointsNamesEnum.GetNomenclature]: build.query<
        GetNomenclatureResponse,
        GetNomenclatureRequest
      >({
        query: (id) => ({
          url: getNomenclatureUrl(id),
          method: HttpMethodEnum.Get,
        }),
      }),
      [NomenclaturesEndpointsNamesEnum.CreateNomenclature]: build.mutation<
        CreateNomenclatureResponse,
        CreateNomenclatureRequest
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [NomenclaturesEndpointsTagsEnum.Nomenclatures],
        query: (payload) => ({
          url: NomenclaturesEndpointsEnum.CreateNomenclature,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      [NomenclaturesEndpointsNamesEnum.UpdateNomenclature]: build.mutation<
        UpdateNomenclatureResponse,
        UpdateNomenclatureRequest
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [NomenclaturesEndpointsTagsEnum.Nomenclatures],
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
  useGetNomenclaturesQuery,
} = nomenclaturesEndpoints
