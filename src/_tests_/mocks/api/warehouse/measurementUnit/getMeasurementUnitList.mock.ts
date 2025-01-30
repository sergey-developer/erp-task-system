import { GetMeasurementUnitListSuccessResponse } from 'features/warehouse/models'
import { MeasurementUnitApiEnum } from 'features/warehouse/services/measurementUnitApiService'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getMeasurementUnitListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, MeasurementUnitApiEnum.GetMeasurementUnitList)

export const mockGetMeasurementUnitListSuccess = (
  options?: Partial<ResponseResolverOptions<GetMeasurementUnitListSuccessResponse>>,
) => getSuccessMockFn(getMeasurementUnitListMockFn(), options)()

export const mockGetMeasurementUnitListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getMeasurementUnitListMockFn(), options)()
