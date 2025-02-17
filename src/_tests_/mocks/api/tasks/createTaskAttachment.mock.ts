import { makeCreateTaskAttachmentApiPath } from 'features/tasks/api/helpers'
import { CreateTaskAttachmentResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const createTaskAttachmentMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, makeCreateTaskAttachmentApiPath(taskId))

export const mockCreateTaskAttachmentSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<CreateTaskAttachmentResponse>>,
) => getSuccessMockFn(createTaskAttachmentMockFn(taskId), options)()
