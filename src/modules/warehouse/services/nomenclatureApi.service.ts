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
  NomenclatureGroupListModel,
} from 'modules/warehouse/models'
import { GetNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

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
        ) => ({
          pagination: {
            current: arg.offset / arg.limit + 1,
            pageSize: arg.limit,
            total: response.count,
          },
          results: response.results,
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
    }),
  })

export const {
  useCreateNomenclatureGroupMutation,
  useGetNomenclatureGroupListQuery,
  useCreateNomenclatureMutation,
  useGetNomenclatureListQuery,
} = nomenclatureApiService
