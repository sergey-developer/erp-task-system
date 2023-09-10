import { EquipmentApiEnum } from 'modules/warehouse/constants'
import { GetEquipmentNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const getEquipmentNomenclatureListMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    EquipmentApiEnum.GetEquipmentNomenclatureList,
  )

export const mockGetEquipmentNomenclatureListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetEquipmentNomenclatureListTransformedSuccessResponse>
  >,
) => getSuccessMockFn(getEquipmentNomenclatureListMockFn(), options)()

export const mockGetEquipmentNomenclatureListForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentNomenclatureListMockFn(), options)()

export const mockGetEquipmentNomenclatureListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentNomenclatureListMockFn(), options)()
