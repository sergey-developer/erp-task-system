import { CreateSubTaskSuccessResponse } from 'modules/subTask/models'
import { createSubTaskUrl } from 'modules/subTask/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'
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
  options?: Partial<ResponseResolverOptions<CreateSubTaskSuccessResponse>>,
) => getSuccessMockFn(createSubTaskMockFn(id), options)()

export const mockCreateSubTaskBadRequestError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createSubTaskMockFn(id), options)()

export const mockCreateSubTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createSubTaskMockFn(id), options)()
