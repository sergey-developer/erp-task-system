import { makeMoveRelocationTaskDraftToWorkApiPath } from 'features/relocationTasks/api/helpers'
import { MoveRelocationTaskDraftToWorkResponse } from 'features/relocationTasks/api/schemas'
import { RequestWithRelocationTask } from 'features/relocationTasks/api/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const moveRelocationTaskDraftToWorkMockFn = ({ relocationTaskId }: RequestWithRelocationTask) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    makeMoveRelocationTaskDraftToWorkApiPath({ relocationTaskId }),
  )

export const mockMoveRelocationTaskDraftToWorkSuccess = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<MoveRelocationTaskDraftToWorkResponse>>,
) => getSuccessMockFn(moveRelocationTaskDraftToWorkMockFn({ relocationTaskId }), options)()
