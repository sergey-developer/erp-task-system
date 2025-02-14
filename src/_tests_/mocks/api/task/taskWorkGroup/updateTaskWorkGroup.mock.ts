import { UpdateTaskWorkGroupResponse } from 'features/task/models'
import { updateTaskWorkGroupUrl } from 'features/task/utils/taskWorkGroup'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateTaskWorkGroupMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, updateTaskWorkGroupUrl(taskId))

export const mockUpdateTaskWorkGroupSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<UpdateTaskWorkGroupResponse>>,
) => getSuccessMockFn(updateTaskWorkGroupMockFn(taskId), options)()
