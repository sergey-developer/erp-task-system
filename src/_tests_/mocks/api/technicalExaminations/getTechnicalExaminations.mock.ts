import { TechnicalExaminationsApiEnum } from 'modules/technicalExaminations/constants'
import { GetTechnicalExaminationsSuccessResponse } from 'modules/technicalExaminations/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTechnicalExaminationsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TechnicalExaminationsApiEnum.GetTechnicalExaminations)

export const mockGetTechnicalExaminationsSuccess = (
  options?: Partial<ResponseResolverOptions<GetTechnicalExaminationsSuccessResponse>>,
) => getSuccessMockFn(getTechnicalExaminationsMockFn(), options)()
