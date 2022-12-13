import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { GetSubTaskListResponseModel } from 'modules/subTask/models'
import { getSubTaskListUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getGetSubTaskListMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getSubTaskListUrl(taskId))

export const mockGetSubTaskListSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<GetSubTaskListResponseModel>>,
) => {
  getSuccessMockFn(getGetSubTaskListMockFn(taskId), options)()
}

export const mockGetSubTaskListServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  getServerErrorMockFn(getGetSubTaskListMockFn(taskId), options)()
}
