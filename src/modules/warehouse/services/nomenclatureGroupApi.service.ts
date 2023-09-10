import {
  NomenclatureGroupApiEnum,
  NomenclatureGroupApiTriggerEnum,
} from 'modules/warehouse/constants'
import {
  CreateNomenclatureGroupMutationArgs,
  CreateNomenclatureGroupSuccessResponse,
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureGroupListSuccessResponse,
  NomenclatureGroupListModel,
  UpdateNomenclatureGroupMutationArgs,
  UpdateNomenclatureGroupSuccessResponse,
} from 'modules/warehouse/models'
import { updateNomenclatureGroupUrl } from 'modules/warehouse/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const nomenclatureGroupApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    [NomenclatureGroupApiTriggerEnum.GetNomenclatureGroupList]: build.query<
      GetNomenclatureGroupListSuccessResponse,
      MaybeUndefined<GetNomenclatureGroupListQueryArgs>
    >({
      query: (params) => ({
        url: NomenclatureGroupApiEnum.GetNomenclatureGroupList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    [NomenclatureGroupApiTriggerEnum.CreateNomenclatureGroup]: build.mutation<
      CreateNomenclatureGroupSuccessResponse,
      CreateNomenclatureGroupMutationArgs
    >({
      query: ({ getListParams, ...payload }) => ({
        url: NomenclatureGroupApiEnum.CreateNomenclatureGroup,
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
              NomenclatureGroupApiTriggerEnum.GetNomenclatureGroupList as never,
              getListParams as never,
              (groupList: NomenclatureGroupListModel) => {
                groupList.push(newGroup)
              },
            ),
          )
        } catch {}
      },
    }),
    [NomenclatureGroupApiTriggerEnum.UpdateNomenclatureGroup]: build.mutation<
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
              NomenclatureGroupApiTriggerEnum.GetNomenclatureGroupList as never,
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
  useCreateNomenclatureGroupMutation,
  useUpdateNomenclatureGroupMutation,
  useGetNomenclatureGroupListQuery,
} = nomenclatureGroupApiService
