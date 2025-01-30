import { CreateTaskRegistrationFNRequestSuccessResponse } from 'features/task/models'
import { createTaskRegistrationFNRequestUrl } from 'features/task/utils/task'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createTaskRegistrationFNRequestMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createTaskRegistrationFNRequestUrl(taskId))

export const mockCreateTaskRegistrationFNRequestSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<CreateTaskRegistrationFNRequestSuccessResponse>>,
) => getSuccessMockFn(createTaskRegistrationFNRequestMockFn(taskId), options)()
