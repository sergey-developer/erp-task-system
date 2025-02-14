import { TechnicalExaminationsApiPathsEnum } from 'features/technicalExaminations/api/constants'
import { GetTechnicalExaminationsResponse } from 'features/technicalExaminations/api/dto'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTechnicalExaminationsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TechnicalExaminationsApiPathsEnum.GetTechnicalExaminations)

export const mockGetTechnicalExaminationsSuccess = (
  options?: Partial<ResponseResolverOptions<GetTechnicalExaminationsResponse>>,
) => getSuccessMockFn(getTechnicalExaminationsMockFn(), options)()
