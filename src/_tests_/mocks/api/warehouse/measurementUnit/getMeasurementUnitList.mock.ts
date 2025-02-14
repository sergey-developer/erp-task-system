import { GetMeasurementUnitsCatalogResponse } from 'features/warehouse/models'
import { CatalogEndpointsEnum } from 'features/warehouse/services/measurementUnitApiService'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getMeasurementUnitListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogEndpointsEnum.GetMeasurementUnits)

export const mockGetMeasurementUnitListSuccess = (
  options?: Partial<ResponseResolverOptions<GetMeasurementUnitsCatalogResponse>>,
) => getSuccessMockFn(getMeasurementUnitListMockFn(), options)()

export const mockGetMeasurementUnitListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getMeasurementUnitListMockFn(), options)()
