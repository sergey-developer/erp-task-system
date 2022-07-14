import { GetTaskListTransformedResponse } from 'modules/tasks/taskList/interfaces'
import {
  GetTaskListQueryArgsModel,
  GetTaskListResponseModel,
} from 'modules/tasks/taskList/models'
import {
  GetTaskByIdQueryArgsModel,
  GetTaskByIdResponseModel,
  ResolveTaskMutationArgsModel,
} from 'modules/tasks/taskView/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    getTaskList: build.query<
      GetTaskListTransformedResponse,
      GetTaskListQueryArgsModel
    >({
      query: (data) => ({
        url: '/tasks',
        method: HttpMethodEnum.GET,
        params: data,
      }),
      // todo: вынести трансформацию ответа под ант пагинацию в общий модуль
      transformResponse: (response: GetTaskListResponseModel, meta, arg) => {
        return {
          pagination: {
            current: arg.offset / arg.limit + 1,
            pageSize: arg.limit,
            total: response.count,
          },
          results: response.results,
        }
      },
    }),
    getTaskById: build.query<
      GetTaskByIdResponseModel,
      GetTaskByIdQueryArgsModel
    >({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: HttpMethodEnum.GET,
      }),
    }),
    resolveTask: build.mutation<null, ResolveTaskMutationArgsModel>({
      query: (queryArg) => {
        const { taskId, ...body } = queryArg
        return {
          url: `/tasks/${taskId}/resolution/`,
          method: HttpMethodEnum.POST,
          data: body,
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTaskListQuery,
  useGetTaskByIdQuery,
  useResolveTaskMutation,
} = tasksService

export default tasksService

/**
 * todo: Внимательно следить за обновлениями RTK query и поправить при первой возможности
 * RTK query не умеет правильно доставать ReturnType из сгенерированного useQuery хука
 * хак, который исправляет проблему взят отсюда https://github.com/reduxjs/redux-toolkit/issues/1363
 * открытый issue по проблеме https://github.com/reduxjs/redux-toolkit/issues/1937
 * пулл реквест за которым нужно следить https://github.com/reduxjs/redux-toolkit/pull/2276
 */

let getTaskById
let getTaskList
if (false as boolean) {
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  getTaskById = useGetTaskByIdQuery()
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  getTaskList = useGetTaskListQuery()
}

export type UseGetTaskByIdQueryReturnType = NonNullable<typeof getTaskById>
export type UseGetTaskListQueryReturnType = NonNullable<typeof getTaskList>
