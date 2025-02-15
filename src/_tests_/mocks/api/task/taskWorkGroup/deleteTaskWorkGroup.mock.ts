import { DeleteTaskWorkGroupResponse } from 'features/tasks/api/schemas'
import { deleteTaskWorkGroupUrl } from 'features/tasks/utils/taskWorkGroup'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const deleteTaskWorkGroupMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Delete, deleteTaskWorkGroupUrl(id))

export const mockDeleteTaskWorkGroupSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<DeleteTaskWorkGroupResponse>>,
) => getSuccessMockFn(deleteTaskWorkGroupMockFn(id), options)()
