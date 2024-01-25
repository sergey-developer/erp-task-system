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

const getRelocationTaskAttachmentsMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationTaskAttachmentsUrl(id))

export const mockGetRelocationTaskAttachmentsSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskAttachmentsSuccessResponse>>,
) => getSuccessMockFn(getRelocationTaskAttachmentsMockFn(id), options)()

export const mockGetRelocationTaskAttachmentsNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationTaskAttachmentsMockFn(id), options)()

export const mockGetRelocationTaskAttachmentsForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationTaskAttachmentsMockFn(id), options)()

export const mockGetRelocationTaskAttachmentsServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationTaskAttachmentsMockFn(id), options)()
