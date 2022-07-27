import {
  GetTaskCommentListQueryArgsModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/components/TaskView/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const taskCommentsService = api.injectEndpoints({
  endpoints: (build) => ({
    getTaskCommentList: build.query<
      GetTaskCommentListResponseModel,
      GetTaskCommentListQueryArgsModel
    >({
      query: (id) => ({
        url: `/tasks/${id}/comments`,
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskCommentListQuery } = taskCommentsService

export default taskCommentsService

/**
 * todo: Внимательно следить за обновлениями RTK query и поправить при первой возможности
 * RTK query не умеет правильно доставать ReturnType из сгенерированного useQuery хука
 * хак, который исправляет проблему взят отсюда https://github.com/reduxjs/redux-toolkit/issues/1363
 * открытый issue по проблеме https://github.com/reduxjs/redux-toolkit/issues/1937
 * пулл реквест за которым нужно следить https://github.com/reduxjs/redux-toolkit/pull/2276
 */

let getTaskCommentList
if (false as boolean) {
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  getTaskCommentList = useGetTaskCommentListQuery()
}

export type UseGetTaskCommentListQueryReturnType = NonNullable<
  typeof getTaskCommentList
>
