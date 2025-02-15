import { getTaskUrl } from 'features/tasks/helpers'
import { GetTaskResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskMockFn = (id: IdType) => getRequestMockFn(HttpMethodEnum.Get, getTaskUrl(id))

export const mockGetTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskResponse>>,
) => getSuccessMockFn(getTaskMockFn(id), options)()
