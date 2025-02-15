import { makeUpdateNomenclatureEndpoint } from 'features/nomenclatures/api/helpers'
import { UpdateNomenclatureResponse } from 'features/warehouses/api/dto'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateNomenclatureMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, makeUpdateNomenclatureApiPath(id))

export const mockUpdateNomenclatureSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateNomenclatureResponse>>,
) => getSuccessMockFn(updateNomenclatureMockFn(id), options)()
