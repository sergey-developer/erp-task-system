import { TechnicalExaminationsEndpointsEnum } from 'features/technicalExaminations/constants'
import { GetTechnicalExaminationsSuccessResponse } from 'features/technicalExaminations/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTechnicalExaminationsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TechnicalExaminationsEndpointsEnum.GetTechnicalExaminations)

export const mockGetTechnicalExaminationsSuccess = (
  options?: Partial<ResponseResolverOptions<GetTechnicalExaminationsSuccessResponse>>,
) => getSuccessMockFn(getTechnicalExaminationsMockFn(), options)()
