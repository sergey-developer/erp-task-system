import {
  NomenclatureApiEnum,
  NomenclatureApiTriggerEnum,
} from 'modules/warehouse/constants'
import {
  CreateNomenclatureGroupMutationArgs,
  CreateNomenclatureGroupSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const nomenclatureApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    [NomenclatureApiTriggerEnum.CreateNomenclatureGroup]: build.mutation<
      CreateNomenclatureGroupSuccessResponse,
      CreateNomenclatureGroupMutationArgs
    >({
      query: (payload) => ({
        url: NomenclatureApiEnum.CreateNomenclatureGroup,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
        try {
          const { data: newGroup } = await queryFulfilled

          dispatch(
            baseApiService.util.updateQueryData(
              NomenclatureApiTriggerEnum.GetNomenclatureGroupList as never,
              undefined as never,
              // todo: fix any when backend will be ready
              (groupList: any[]) => {
                groupList.push(newGroup)
              },
            ),
          )
        } catch {}
      },
    }),
  }),
})

export const { useCreateNomenclatureGroupMutation } = nomenclatureApiService
