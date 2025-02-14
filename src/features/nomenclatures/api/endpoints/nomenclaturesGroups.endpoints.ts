import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  NomenclaturesGroupsApiPathsEnum,
  NomenclaturesGroupsEndpointsNamesEnum,
} from '../constants'
import { NomenclaturesGroupsDTO } from '../dto'
import { makeUpdateNomenclatureGroupApiPath } from '../helpers'
import {
  CreateNomenclatureGroupRequest,
  CreateNomenclatureGroupResponse,
  GetNomenclaturesGroupsRequest,
  GetNomenclaturesGroupsResponse,
  UpdateNomenclatureGroupRequest,
  UpdateNomenclatureGroupResponse,
} from '../schemas'

const nomenclaturesGroupsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    [NomenclaturesGroupsEndpointsNamesEnum.GetNomenclaturesGroups]: build.query<
      GetNomenclaturesGroupsResponse,
      GetNomenclaturesGroupsRequest
    >({
      query: (params) => ({
        url: NomenclaturesGroupsApiPathsEnum.GetNomenclaturesGroups,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    [NomenclaturesGroupsEndpointsNamesEnum.CreateNomenclatureGroup]: build.mutation<
      CreateNomenclatureGroupResponse,
      CreateNomenclatureGroupRequest
    >({
      query: ({ getListParams, ...payload }) => ({
        url: NomenclaturesGroupsApiPathsEnum.CreateNomenclatureGroup,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async ({ getListParams }, { dispatch, queryFulfilled }) => {
        try {
          const { data: newGroup } = await queryFulfilled

          dispatch(
            baseApi.util.updateQueryData(
              NomenclaturesGroupsEndpointsNamesEnum.GetNomenclaturesGroups as never,
              getListParams as never,
              (groups: NomenclaturesGroupsDTO) => {
                groups.push(newGroup)
              },
            ),
          )
        } catch {}
      },
    }),
    [NomenclaturesGroupsEndpointsNamesEnum.UpdateNomenclatureGroup]: build.mutation<
      UpdateNomenclatureGroupResponse,
      UpdateNomenclatureGroupRequest
    >({
      query: ({ getListParams, id, ...payload }) => ({
        url: makeUpdateNomenclatureGroupApiPath(id),
        method: HttpMethodEnum.Patch,
        data: payload,
      }),
      onQueryStarted: async ({ getListParams, id }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedGroup } = await queryFulfilled

          dispatch(
            baseApi.util.updateQueryData(
              NomenclaturesGroupsEndpointsNamesEnum.GetNomenclaturesGroups as never,
              getListParams as never,
              (groups: NomenclaturesGroupsDTO) => {
                const updatableGroup = groups.find((group) => group.id === id)

                if (updatableGroup) {
                  Object.assign(updatableGroup, updatedGroup)
                }
              },
            ),
          )
        } catch {}
      },
    }),
  }),
})

export const {
  useCreateNomenclatureGroupMutation,
  useUpdateNomenclatureGroupMutation,
  useGetNomenclaturesGroupsQuery,
} = nomenclaturesGroupsEndpoints
