import { GetTaskRegistrationRequestRecipientsFNSuccessResponse } from 'modules/task/models'
import { getTaskRegistrationRequestRecipientsFNUrl } from 'modules/task/utils/task'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskRegistrationRequestRecipientsFNMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskRegistrationRequestRecipientsFNUrl(id))

export const mockGetTaskRegistrationRequestRecipientsFNSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskRegistrationRequestRecipientsFNSuccessResponse>>,
) => getSuccessMockFn(getTaskRegistrationRequestRecipientsFNMockFn(id), options)()
