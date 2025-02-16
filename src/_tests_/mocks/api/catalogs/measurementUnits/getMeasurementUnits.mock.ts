import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import { GetMeasurementUnitsCatalogResponse } from 'shared/catalogs/measurementUnits/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getMeasurementUnitsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetMeasurementUnits)

export const mockGetMeasurementUnitsSuccess = (
  options?: Partial<ResponseResolverOptions<GetMeasurementUnitsCatalogResponse>>,
) => getSuccessMockFn(getMeasurementUnitsMockFn(), options)()

export const mockGetMeasurementUnitsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getMeasurementUnitsMockFn(), options)()
