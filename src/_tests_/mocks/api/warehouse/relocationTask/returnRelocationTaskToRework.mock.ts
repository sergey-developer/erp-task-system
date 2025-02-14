import {
  ReturnRelocationTaskToReworkBadRequestErrorResponse,
  ReturnRelocationTaskToReworkResponse,
} from 'features/warehouse/models'
import { returnRelocationTaskToReworkUrl } from 'features/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const returnRelocationTaskToReworkMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, returnRelocationTaskToReworkUrl(id))

export const mockReturnRelocationTaskToReworkSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ReturnRelocationTaskToReworkResponse>>,
) => getSuccessMockFn(returnRelocationTaskToReworkMockFn(id), options)()

export const mockReturnRelocationTaskToReworkBadRequestError = (
  id: IdType,
  options?: Partial<
    ResponseResolverOptions<ErrorData<ReturnRelocationTaskToReworkBadRequestErrorResponse>>
  >,
) => getBadRequestErrorMockFn(returnRelocationTaskToReworkMockFn(id), options)()

export const mockReturnRelocationTaskToReworkNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(returnRelocationTaskToReworkMockFn(id), options)()

export const mockReturnRelocationTaskToReworkForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(returnRelocationTaskToReworkMockFn(id), options)()

export const mockReturnRelocationTaskToReworkServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(returnRelocationTaskToReworkMockFn(id), options)()
