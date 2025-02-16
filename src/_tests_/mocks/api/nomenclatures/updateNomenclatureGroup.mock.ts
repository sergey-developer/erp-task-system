import { makeUpdateNomenclatureGroupApiPath } from 'features/nomenclatures/api/helpers'
import { UpdateNomenclatureGroupResponse } from 'features/nomenclatures/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateNomenclatureGroupMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, makeUpdateNomenclatureGroupApiPath(id))

export const mockUpdateNomenclatureGroupSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateNomenclatureGroupResponse>>,
) => getSuccessMockFn(updateNomenclatureGroupMockFn(id), options)()
