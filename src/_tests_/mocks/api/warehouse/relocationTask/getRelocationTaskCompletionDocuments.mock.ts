import { GetRelocationTaskCompletionDocumentsSuccessResponse } from 'modules/warehouse/models'
import { getRelocationTaskCompletionDocumentsUrl } from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationTaskCompletionDocumentsMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationTaskCompletionDocumentsUrl(id))

export const mockGetRelocationTaskCompletionDocumentsSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskCompletionDocumentsSuccessResponse>>,
) => getSuccessMockFn(getRelocationTaskCompletionDocumentsMockFn(id), options)()
