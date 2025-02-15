import { createTaskAttachmentUrl } from 'features/tasks/helpers'
import { CreateTaskAttachmentResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createTaskAttachmentMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createTaskAttachmentUrl(taskId))

export const mockCreateTaskAttachmentSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<CreateTaskAttachmentResponse>>,
) => getSuccessMockFn(createTaskAttachmentMockFn(taskId), options)()
