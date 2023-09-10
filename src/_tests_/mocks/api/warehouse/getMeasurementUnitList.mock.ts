import { MeasurementUnitApiEnum } from 'modules/warehouse/constants'
import { GetMeasurementUnitListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const getMeasurementUnitListMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    MeasurementUnitApiEnum.GetMeasurementUnitList,
  )

export const mockGetMeasurementUnitListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetMeasurementUnitListSuccessResponse>
  >,
) => getSuccessMockFn(getMeasurementUnitListMockFn(), options)()

export const mockGetMeasurementUnitListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getMeasurementUnitListMockFn(), options)()
