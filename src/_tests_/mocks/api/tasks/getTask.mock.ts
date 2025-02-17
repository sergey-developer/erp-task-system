import { makeGetTaskApiPath } from 'features/tasks/api/helpers'
import { GetTaskResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getTaskMockFn = (id: IdType) => getRequestMockFn(HttpMethodEnum.Get, makeGetTaskApiPath(id))

export const mockGetTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskResponse>>,
) => getSuccessMockFn(getTaskMockFn(id), options)()
