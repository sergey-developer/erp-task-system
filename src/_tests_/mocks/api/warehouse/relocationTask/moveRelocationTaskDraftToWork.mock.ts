import { MoveRelocationTaskDraftToWorkResponse } from 'features/warehouse/models'
import { RequestWithRelocationTask } from 'features/warehouse/types'
import { makeMoveRelocationTaskDraftToWorkApiUrl } from 'features/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const moveRelocationTaskDraftToWorkMockFn = ({ relocationTaskId }: RequestWithRelocationTask) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    makeMoveRelocationTaskDraftToWorkApiUrl({ relocationTaskId }),
  )

export const mockMoveRelocationTaskDraftToWorkSuccess = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<MoveRelocationTaskDraftToWorkResponse>>,
) => getSuccessMockFn(moveRelocationTaskDraftToWorkMockFn({ relocationTaskId }), options)()
