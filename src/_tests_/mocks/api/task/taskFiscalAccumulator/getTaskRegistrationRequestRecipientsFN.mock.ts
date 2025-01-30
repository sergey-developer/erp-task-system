import { GetTaskRegistrationRequestRecipientsFNSuccessResponse } from 'features/task/models'
import { getTaskRegistrationRequestRecipientsFNUrl } from 'features/task/utils/task'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskRegistrationRequestRecipientsFNMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskRegistrationRequestRecipientsFNUrl(taskId))

export const mockGetTaskRegistrationRequestRecipientsFNSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskRegistrationRequestRecipientsFNSuccessResponse>>,
) => getSuccessMockFn(getTaskRegistrationRequestRecipientsFNMockFn(taskId), options)()
