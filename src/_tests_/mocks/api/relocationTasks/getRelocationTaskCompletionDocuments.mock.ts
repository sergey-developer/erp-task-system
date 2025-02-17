import { makeGetRelocationTaskCompletionDocumentsApiPath } from 'features/relocationTasks/api/helpers'
import { GetRelocationTaskCompletionDocumentsResponse } from 'features/relocationTasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getRelocationTaskCompletionDocumentsMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetRelocationTaskCompletionDocumentsApiPath(id))

export const mockGetRelocationTaskCompletionDocumentsSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskCompletionDocumentsResponse>>,
) => getSuccessMockFn(getRelocationTaskCompletionDocumentsMockFn(id), options)()
