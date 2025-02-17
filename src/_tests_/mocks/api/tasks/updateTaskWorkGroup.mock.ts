import { makeUpdateTaskWorkGroupApiPath } from 'features/tasks/api/helpers'
import { UpdateTaskWorkGroupResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const updateTaskWorkGroupMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, makeUpdateTaskWorkGroupApiPath(taskId))

export const mockUpdateTaskWorkGroupSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<UpdateTaskWorkGroupResponse>>,
) => getSuccessMockFn(updateTaskWorkGroupMockFn(taskId), options)()
