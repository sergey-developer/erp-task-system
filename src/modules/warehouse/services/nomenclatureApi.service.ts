import {
  NomenclatureApiEnum,
  NomenclatureApiTriggerEnum,
} from 'modules/warehouse/constants'
import {
  CreateNomenclatureGroupMutationArgs,
  CreateNomenclatureGroupSuccessResponse,
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureGroupListSuccessResponse,
  NomenclatureGroupListModel,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'
import { MaybeUndefined } from 'shared/types/utils'

const nomenclatureApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
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
} = nomenclatureApiService
