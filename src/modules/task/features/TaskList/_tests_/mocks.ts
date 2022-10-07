import { getTaskListItem } from '_fixtures_/task'
import { getRequestMocker } from '_tests_/mocks/request'
import { getResponseResolver } from '_tests_/mocks/response'
import { TaskEndpointsEnum } from 'modules/task/constants/api'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'

import {
  GetTaskCountersResponseModel,
  GetTaskListResponseModel,
} from '../models'

const getTaskListMocker = getRequestMocker(
  HttpMethodEnum.Get,
  TaskEndpointsEnum.TaskList,
)

const getTaskCountersMocker = getRequestMocker(
  HttpMethodEnum.Get,
  TaskEndpointsEnum.TaskCounters,
)

export const mockGetTaskListSuccess = (
  taskList: GetTaskListResponseModel['results'] = [getTaskListItem()],
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

export const mockGetTaskCountersSuccess = (
  response: GetTaskCountersResponseModel = {
    all: 1,
    closed: 1,
    free: 1,
    mine: 1,
    overdue: 1,
  },
) => {
  const mockGetTaskCounters = getTaskCountersMocker(
    getResponseResolver({
      status: HttpCodeEnum.Ok,
      body: response,
    }),
  )

  mockGetTaskCounters()
}
