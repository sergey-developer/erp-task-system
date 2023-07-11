import { CreateTaskReclassificationRequestSuccessResponse } from 'modules/task/models'
import { createTaskReclassificationRequestUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createTaskReclassificationRequestMockFn = (taskId: number) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    createTaskReclassificationRequestUrl(taskId),
  )

export const mockCreateTaskReclassificationRequestSuccess = (
  taskId: number,
  options?: Partial<
    ResponseResolverOptions<CreateTaskReclassificationRequestSuccessResponse>
  >,
) =>
  getSuccessMockFn(createTaskReclassificationRequestMockFn(taskId), options)()

export const mockCreateTaskReclassificationRequestNotFoundError = <
  T extends object,
>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) =>
  getNotFoundErrorMockFn(
    createTaskReclassificationRequestMockFn(taskId),
    options,
  )()

export const mockCreateTaskReclassificationRequestServerError = <
  T extends object,
>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) =>
  getServerErrorMockFn(
    createTaskReclassificationRequestMockFn(taskId),
    options,
  )()
