import { makeGetTaskRegistrationRequestRecipientsFNApiPath } from 'features/tasks/api/helpers'
import { GetTaskRegistrationRequestRecipientsFNResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getTaskRegistrationRequestRecipientsFNMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetTaskRegistrationRequestRecipientsFNApiPath(taskId))

export const mockGetTaskRegistrationRequestRecipientsFNSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskRegistrationRequestRecipientsFNResponse>>,
) => getSuccessMockFn(getTaskRegistrationRequestRecipientsFNMockFn(taskId), options)()
