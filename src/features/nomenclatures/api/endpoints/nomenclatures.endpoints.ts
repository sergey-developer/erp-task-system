import { getPaginatedList } from 'lib/antd/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  NomenclaturesApiPathsEnum,
  NomenclaturesEndpointsNamesEnum,
  NomenclaturesEndpointsTagsEnum,
} from '../constants'
import { makeGetNomenclatureApiPath, makeUpdateNomenclatureApiPath } from '../helpers'
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
import { GetNomenclaturesTransformedResponse } from '../types'

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
          url: NomenclaturesApiPathsEnum.GetNomenclatures,
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
          url: makeGetNomenclatureApiPath(id),
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
          url: NomenclaturesApiPathsEnum.CreateNomenclature,
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
          url: makeUpdateNomenclatureApiPath(id),
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
