import { AttachmentApiEnum } from 'modules/attachment/constants'
import { CreateAttachmentSuccessResponse } from 'modules/attachment/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createAttachmentMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AttachmentApiEnum.CreateAttachment)

export const mockCreateAttachmentSuccess = (
  options?: Partial<ResponseResolverOptions<CreateAttachmentSuccessResponse>>,
) => getSuccessMockFn(createAttachmentMockFn(), options)()

export const mockCreateAttachmentBadRequestError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(createAttachmentMockFn(), options)()

export const mockCreateAttachmentServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(createAttachmentMockFn(), options)()
