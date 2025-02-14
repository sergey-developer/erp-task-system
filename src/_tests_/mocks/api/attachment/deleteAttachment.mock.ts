import { makeDeleteAttachmentEndpoint } from 'features/attachments/api/helpers'
import { DeleteAttachmentResponse } from 'features/attachments/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const deleteAttachmentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Delete, makeDeleteAttachmentEndpoint(id))

export const mockDeleteAttachmentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<DeleteAttachmentResponse>>,
) => getSuccessMockFn(deleteAttachmentMockFn(id), options)()

export const mockDeleteAttachmentBadRequestError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(deleteAttachmentMockFn(id), options)()

export const mockDeleteAttachmentForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(deleteAttachmentMockFn(id), options)()

export const mockDeleteAttachmentNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(deleteAttachmentMockFn(id), options)()

export const mockDeleteAttachmentServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(deleteAttachmentMockFn(id), options)()
