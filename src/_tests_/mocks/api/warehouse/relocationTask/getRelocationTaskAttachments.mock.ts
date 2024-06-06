import { GetRelocationTaskAttachmentsSuccessResponse } from 'modules/warehouse/models'
import { getRelocationTaskAttachmentsUrl } from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationTaskAttachmentsMockFn = (relocationTaskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationTaskAttachmentsUrl(relocationTaskId))

export const mockGetRelocationTaskAttachmentsSuccess = (
  relocationTaskId: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskAttachmentsSuccessResponse>>,
) => getSuccessMockFn(getRelocationTaskAttachmentsMockFn(relocationTaskId), options)()

export const mockGetRelocationTaskAttachmentsNotFoundError = (
  relocationTaskId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationTaskAttachmentsMockFn(relocationTaskId), options)()

export const mockGetRelocationTaskAttachmentsForbiddenError = (
  relocationTaskId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationTaskAttachmentsMockFn(relocationTaskId), options)()

export const mockGetRelocationTaskAttachmentsServerError = (
  relocationTaskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationTaskAttachmentsMockFn(relocationTaskId), options)()
