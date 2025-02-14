import { UpdateNomenclatureGroupResponse } from 'features/warehouse/models'
import { makeUpdateNomenclatureGroupEndpoint } from 'features/warehouse/utils/nomenclatureGroup'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateNomenclatureGroupMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, makeUpdateNomenclatureGroupEndpoint(id))

export const mockUpdateNomenclatureGroupSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateNomenclatureGroupResponse>>,
) => getSuccessMockFn(updateNomenclatureGroupMockFn(id), options)()
