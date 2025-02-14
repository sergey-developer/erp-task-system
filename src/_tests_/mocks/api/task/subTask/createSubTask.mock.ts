import { CreateSubTaskResponse } from 'features/task/models'
import { createSubTaskUrl } from 'features/task/utils/task'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'
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
