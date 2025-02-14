import { getRelocationTaskCompletionDocumentsUrl } from 'features/relocationTasks/api/helpers'
import { GetRelocationTaskCompletionDocumentsResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationTaskCompletionDocumentsMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationTaskCompletionDocumentsUrl(id))

export const mockGetRelocationTaskCompletionDocumentsSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskCompletionDocumentsResponse>>,
) => getSuccessMockFn(getRelocationTaskCompletionDocumentsMockFn(id), options)()
