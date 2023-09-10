import { CreateTaskReclassificationRequestSuccessResponse } from 'modules/task/models'
import { createTaskReclassificationRequestUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const createTaskReclassificationRequestMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createTaskReclassificationRequestUrl(id))

export const mockCreateTaskReclassificationRequestSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CreateTaskReclassificationRequestSuccessResponse>>,
) => getSuccessMockFn(createTaskReclassificationRequestMockFn(id), options)()

export const mockCreateTaskReclassificationRequestNotFoundError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getNotFoundErrorMockFn(createTaskReclassificationRequestMockFn(id), options)()

export const mockCreateTaskReclassificationRequestServerError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(createTaskReclassificationRequestMockFn(id), options)()
