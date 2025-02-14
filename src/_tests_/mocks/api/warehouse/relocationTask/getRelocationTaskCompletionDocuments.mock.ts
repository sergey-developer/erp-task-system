import { GetRelocationTaskCompletionDocumentsResponse } from 'features/warehouse/models'
import { getRelocationTaskCompletionDocumentsUrl } from 'features/warehouse/utils/relocationTask'

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
