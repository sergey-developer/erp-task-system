import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

import { GetWorkGroupListResponseModel } from './workGroupList/models'

const workGroupsService = api.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupList: build.query<GetWorkGroupListResponseModel, null>({
      query: () => ({
        url: '/work-groups',
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export { workGroupsService }

export const { useGetWorkGroupListQuery } = workGroupsService

/**
 * todo: Внимательно следить за обновлениями RTK query и поправить при первой возможности
 * RTK query не умеет правильно доставать ReturnType из сгенерированного useQuery хука
 * хак, который исправляет проблему взят отсюда https://github.com/reduxjs/redux-toolkit/issues/1363
 * открытый issue по проблеме https://github.com/reduxjs/redux-toolkit/issues/1937
 * пулл реквест за которым нужно следить https://github.com/reduxjs/redux-toolkit/pull/2276
 */

let x
if (false as boolean) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  x = useGetWorkGroupListQuery(null)
}

export type UseGetWorkGroupListQueryReturnType = NonNullable<typeof x>
