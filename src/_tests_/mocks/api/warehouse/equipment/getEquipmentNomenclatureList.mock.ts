import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'
import { GetEquipmentNomenclatureListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentNomenclatureListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentApiEnum.GetEquipmentNomenclatureList)

export const mockGetEquipmentNomenclatureListSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentNomenclatureListSuccessResponse>>,
) => getSuccessMockFn(getEquipmentNomenclatureListMockFn(), options)()

export const mockGetEquipmentNomenclatureListForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentNomenclatureListMockFn(), options)()

export const mockGetEquipmentNomenclatureListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentNomenclatureListMockFn(), options)()
