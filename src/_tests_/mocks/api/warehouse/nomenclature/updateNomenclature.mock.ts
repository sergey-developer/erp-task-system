import { UpdateNomenclatureSuccessResponse } from 'features/warehouse/models'
import { updateNomenclatureUrl } from 'features/warehouse/utils/nomenclature'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateNomenclatureMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, updateNomenclatureUrl(id))

export const mockUpdateNomenclatureSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateNomenclatureSuccessResponse>>,
) => getSuccessMockFn(updateNomenclatureMockFn(id), options)()
