import { getRequestMocker } from '_tests_/mocks/request'
import { getResponseResolver } from '_tests_/mocks/response'
import { TaskEndpointsEnum } from 'modules/task/constants/api'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'

import { GetTaskListResponseModel } from '../models'

const getTaskListMocker = getRequestMocker(
  HttpMethodEnum.Get,
  TaskEndpointsEnum.TaskList,
)

export const mockGetTaskListSuccess = (
  taskList: GetTaskListResponseModel['results'],
) => {
  const response: GetTaskListResponseModel = {
    results: taskList,
    count: taskList.length,
    next: null,
    previous: null,
  }

  const mockGetTaskList = getTaskListMocker(
    getResponseResolver({
      status: HttpCodeEnum.Ok,
      body: response,
    }),
  )

  mockGetTaskList()
}
