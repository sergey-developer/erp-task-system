import { MoveRelocationTaskDraftToWorkSuccessResponse } from 'modules/warehouse/models'
import { RelocationTaskRequestArgs } from 'modules/warehouse/types'
import { makeMoveRelocationTaskDraftToWorkApiUrl } from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const moveRelocationTaskDraftToWorkMockFn = ({ relocationTaskId }: RelocationTaskRequestArgs) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    makeMoveRelocationTaskDraftToWorkApiUrl({ relocationTaskId }),
  )

export const mockMoveRelocationTaskDraftToWorkSuccess = (
  { relocationTaskId }: RelocationTaskRequestArgs,
  options?: Partial<ResponseResolverOptions<MoveRelocationTaskDraftToWorkSuccessResponse>>,
) => getSuccessMockFn(moveRelocationTaskDraftToWorkMockFn({ relocationTaskId }), options)()
