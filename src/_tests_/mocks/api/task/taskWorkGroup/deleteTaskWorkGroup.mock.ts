import { DeleteTaskWorkGroupSuccessResponse } from 'modules/task/models'
import { deleteTaskWorkGroupUrl } from 'modules/task/utils/taskWorkGroup'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const deleteTaskWorkGroupMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Delete, deleteTaskWorkGroupUrl(id))

export const mockDeleteTaskWorkGroupSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<DeleteTaskWorkGroupSuccessResponse>>,
) => getSuccessMockFn(deleteTaskWorkGroupMockFn(id), options)()
