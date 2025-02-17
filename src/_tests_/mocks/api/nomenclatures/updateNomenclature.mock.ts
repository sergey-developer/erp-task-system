import { makeUpdateNomenclatureApiPath } from 'features/nomenclatures/api/helpers'
import { UpdateNomenclatureResponse } from 'features/nomenclatures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const updateNomenclatureMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, makeUpdateNomenclatureApiPath(id))

export const mockUpdateNomenclatureSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateNomenclatureResponse>>,
) => getSuccessMockFn(updateNomenclatureMockFn(id), options)()
