import { getPaginatedList } from 'lib/antd/utils'

import {
  NomenclatureApiEnum,
  NomenclatureApiTagEnum,
  NomenclatureApiTriggerEnum,
} from 'modules/warehouse/constants'
import {
  CreateNomenclatureGroupMutationArgs,
  CreateNomenclatureGroupSuccessResponse,
  CreateNomenclatureMutationArgs,
  CreateNomenclatureSuccessResponse,
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureGroupListSuccessResponse,
  GetNomenclatureListQueryArgs,
  GetNomenclatureListSuccessResponse,
  GetNomenclatureQueryArgs,
  GetNomenclatureSuccessResponse,
  NomenclatureGroupListModel,
  UpdateNomenclatureGroupMutationArgs,
  UpdateNomenclatureGroupSuccessResponse,
  UpdateNomenclatureMutationArgs,
  UpdateNomenclatureSuccessResponse,
} from 'modules/warehouse/models'
import { GetNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'
import {
  getNomenclatureUrl,
  updateNomenclatureGroupUrl,
  updateNomenclatureUrl,
} from 'modules/warehouse/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'
import { MaybeUndefined } from 'shared/types/utils'

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
        transformResponse: (
          response: GetNomenclatureListSuccessResponse,
          meta,
          arg,
        ) => getPaginatedList(response, arg),
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

      // todo: выделить в отдельный сервис
      [NomenclatureApiTriggerEnum.GetNomenclatureGroupList]: build.query<
        GetNomenclatureGroupListSuccessResponse,
        MaybeUndefined<GetNomenclatureGroupListQueryArgs>
      >({
        query: (params) => ({
          url: NomenclatureApiEnum.GetNomenclatureGroupList,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),
      [NomenclatureApiTriggerEnum.CreateNomenclatureGroup]: build.mutation<
        CreateNomenclatureGroupSuccessResponse,
        CreateNomenclatureGroupMutationArgs
      >({
        query: ({ getListParams, ...payload }) => ({
          url: NomenclatureApiEnum.CreateNomenclatureGroup,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
        onQueryStarted: async (
          { getListParams },
          { dispatch, queryFulfilled },
        ) => {
          try {
            const { data: newGroup } = await queryFulfilled

            dispatch(
              baseApiService.util.updateQueryData(
                NomenclatureApiTriggerEnum.GetNomenclatureGroupList as never,
                getListParams as never,
                (groupList: NomenclatureGroupListModel) => {
                  groupList.push(newGroup)
                },
              ),
            )
          } catch {}
        },
      }),
      [NomenclatureApiTriggerEnum.UpdateNomenclatureGroup]: build.mutation<
        UpdateNomenclatureGroupSuccessResponse,
        UpdateNomenclatureGroupMutationArgs
      >({
        query: ({ getListParams, id, ...payload }) => ({
          url: updateNomenclatureGroupUrl(id),
          method: HttpMethodEnum.Patch,
          data: payload,
        }),
        onQueryStarted: async (
          { getListParams, id },
          { dispatch, queryFulfilled },
        ) => {
          try {
            const { data: updatedGroup } = await queryFulfilled

            dispatch(
              baseApiService.util.updateQueryData(
                NomenclatureApiTriggerEnum.GetNomenclatureGroupList as never,
                getListParams as never,
                (groupList: NomenclatureGroupListModel) => {
                  const updatableGroup = groupList.find(
                    (group) => group.id === id,
                  )

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
  // todo: выделить в отдельный сервис
  useCreateNomenclatureGroupMutation,
  useUpdateNomenclatureGroupMutation,
  useGetNomenclatureGroupListQuery,

  useCreateNomenclatureMutation,
  useUpdateNomenclatureMutation,
  useGetNomenclatureQuery,
  useGetNomenclatureListQuery,
} = nomenclatureApiService
