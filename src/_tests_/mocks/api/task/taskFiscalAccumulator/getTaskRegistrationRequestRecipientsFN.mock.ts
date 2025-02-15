import { getTaskRegistrationRequestRecipientsFNUrl } from 'features/tasks/helpers'
import { GetTaskRegistrationRequestRecipientsFNResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskRegistrationRequestRecipientsFNMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskRegistrationRequestRecipientsFNUrl(taskId))

export const mockGetTaskRegistrationRequestRecipientsFNSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskRegistrationRequestRecipientsFNResponse>>,
) => getSuccessMockFn(getTaskRegistrationRequestRecipientsFNMockFn(taskId), options)()
