import { CancelRelocationTaskSuccessResponse } from 'modules/warehouse/models'
import { createRelocationTaskAttachmentUrl } from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
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

const createRelocationTaskAttachmentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createRelocationTaskAttachmentUrl(id))

export const mockCreateRelocationTaskAttachmentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CancelRelocationTaskSuccessResponse>>,
) => getSuccessMockFn(createRelocationTaskAttachmentMockFn(id), options)()

export const mockCreateRelocationTaskAttachmentBadRequestError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(createRelocationTaskAttachmentMockFn(id), options)()

export const mockCreateRelocationTaskAttachmentNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(createRelocationTaskAttachmentMockFn(id), options)()

export const mockCreateRelocationTaskAttachmentForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(createRelocationTaskAttachmentMockFn(id), options)()

export const mockCreateRelocationTaskAttachmentServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createRelocationTaskAttachmentMockFn(id), options)()
