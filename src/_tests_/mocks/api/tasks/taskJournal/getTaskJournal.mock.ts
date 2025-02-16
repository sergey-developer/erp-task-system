import { makeGetTaskJournalCsvApiPath, makeGetTaskJournalApiPath } from 'features/tasks/api/helpers'
import { GetTaskJournalResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getJournalMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetTaskJournalApiPath(taskId))

const getJournalCsvMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetTaskJournalCsvApiPath(taskId))

export const mockGetJournalSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskJournalResponse>>,
) => getSuccessMockFn(getJournalMockFn(taskId), options)()

export const mockGetJournalServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getJournalMockFn(taskId), options)()

export const mockGetJournalCsvSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getSuccessMockFn(getJournalCsvMockFn(taskId), options)()

export const mockGetJournalCsvServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getJournalCsvMockFn(taskId), options)()
