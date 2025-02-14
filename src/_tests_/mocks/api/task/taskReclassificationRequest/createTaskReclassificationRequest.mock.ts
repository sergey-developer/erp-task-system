import { CreateTaskReclassificationRequestResponse } from 'features/task/models'
import { createTaskReclassificationRequestUrl } from 'features/task/utils/taskReclassificationRequest'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createTaskReclassificationRequestMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createTaskReclassificationRequestUrl(id))

export const mockCreateTaskReclassificationRequestSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CreateTaskReclassificationRequestResponse>>,
) => getSuccessMockFn(createTaskReclassificationRequestMockFn(id), options)()
