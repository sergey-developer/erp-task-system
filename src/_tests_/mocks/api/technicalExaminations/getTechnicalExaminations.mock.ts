import { TechnicalExaminationsApiPathsEnum } from 'features/technicalExaminations/api/constants'
import { GetTechnicalExaminationsResponse } from 'features/technicalExaminations/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getTechnicalExaminationsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TechnicalExaminationsApiPathsEnum.GetTechnicalExaminations)

export const mockGetTechnicalExaminationsSuccess = (
  options?: Partial<ResponseResolverOptions<GetTechnicalExaminationsResponse>>,
) => getSuccessMockFn(getTechnicalExaminationsMockFn(), options)()
