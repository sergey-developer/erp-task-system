import { UpdateNomenclatureGroupSuccessResponse } from 'features/warehouse/models'
import { updateNomenclatureGroupUrl } from 'features/warehouse/utils/nomenclatureGroup'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateNomenclatureGroupMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, updateNomenclatureGroupUrl(id))

export const mockUpdateNomenclatureGroupSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateNomenclatureGroupSuccessResponse>>,
) => getSuccessMockFn(updateNomenclatureGroupMockFn(id), options)()
