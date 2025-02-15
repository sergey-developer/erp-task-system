import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import { GetMeasurementUnitsCatalogResponse } from 'shared/catalogs/measurementUnits/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getMeasurementUnitListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetMeasurementUnits)

export const mockGetMeasurementUnitListSuccess = (
  options?: Partial<ResponseResolverOptions<GetMeasurementUnitsCatalogResponse>>,
) => getSuccessMockFn(getMeasurementUnitListMockFn(), options)()

export const mockGetMeasurementUnitListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getMeasurementUnitListMockFn(), options)()
