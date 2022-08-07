import { GetWorkGroupListResponseModel } from 'modules/workGroup/components/WorkGroupList/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const workGroupApiService = api.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupList: build.query<GetWorkGroupListResponseModel, null>({
      query: () => ({
        url: '/work-groups',
        method: HttpMethodEnum.GET,
      }),
      keepUnusedDataFor: 30,
    }),
  }),
  overrideExisting: false,
})

export const { useGetWorkGroupListQuery } = workGroupApiService
export default workGroupApiService

/**
 * todo: Внимательно следить за обновлениями RTK query и поправить при первой возможности
 * RTK query не умеет правильно доставать ReturnType из сгенерированного useQuery хука
 * хак, который исправляет проблему взят отсюда https://github.com/reduxjs/redux-toolkit/issues/1363
 * открытый issue по проблеме https://github.com/reduxjs/redux-toolkit/issues/1937
 * пулл реквест за которым нужно следить https://github.com/reduxjs/redux-toolkit/pull/2276
 */
