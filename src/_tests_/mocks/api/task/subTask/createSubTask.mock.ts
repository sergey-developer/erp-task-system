import { createSubTaskUrl } from 'features/tasks/helpers'
import { CreateSubTaskResponse } from 'features/tasks/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createSubTaskMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createSubTaskUrl(id))

export const mockCreateSubTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CreateSubTaskResponse>>,
) => getSuccessMockFn(createSubTaskMockFn(id), options)()

export const mockCreateSubTaskBadRequestError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createSubTaskMockFn(id), options)()

export const mockCreateSubTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createSubTaskMockFn(id), options)()
