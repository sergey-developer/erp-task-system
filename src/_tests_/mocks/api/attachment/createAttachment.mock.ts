import { AttachmentsEndpointsEnum } from 'features/attachments/api/constants'
import { CreateAttachmentSuccessResponse } from 'features/attachments/api/dto'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createAttachmentMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AttachmentsEndpointsEnum.CreateAttachment)

export const mockCreateAttachmentSuccess = (
  options?: Partial<ResponseResolverOptions<CreateAttachmentSuccessResponse>>,
) => getSuccessMockFn(createAttachmentMockFn(), options)()

export const mockCreateAttachmentBadRequestError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(createAttachmentMockFn(), options)()

export const mockCreateAttachmentServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(createAttachmentMockFn(), options)()
