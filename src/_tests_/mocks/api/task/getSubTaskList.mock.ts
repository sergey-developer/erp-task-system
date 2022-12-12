import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { TaskEndpointsEnum } from 'modules/task/constants/api'
import { GetSubTaskListResponseModel } from 'modules/task/features/TaskView/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getGetSubTaskListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskEndpointsEnum.GetSubTaskList)

export const mockGetSubTaskListSuccess = (
  options?: Partial<ResponseResolverOptions<GetSubTaskListResponseModel>>,
) => getSuccessMockFn(getGetSubTaskListMockFn(), options)()

export const mockGetSubTaskListServerError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(getGetSubTaskListMockFn(), options)()
