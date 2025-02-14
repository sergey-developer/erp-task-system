import { AttachmentsApiPathsEnum } from 'features/attachments/api/constants'
import { CreateAttachmentResponse } from 'features/attachments/api/dto'

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
  getRequestMockFn(HttpMethodEnum.Post, AttachmentsApiPathsEnum.CreateAttachment)

export const mockCreateAttachmentSuccess = (
  options?: Partial<ResponseResolverOptions<CreateAttachmentResponse>>,
) => getSuccessMockFn(createAttachmentMockFn(), options)()

export const mockCreateAttachmentBadRequestError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(createAttachmentMockFn(), options)()

export const mockCreateAttachmentServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(createAttachmentMockFn(), options)()
