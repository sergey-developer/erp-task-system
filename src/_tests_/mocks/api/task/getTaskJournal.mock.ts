import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { GetTaskJournalResponseModel } from 'modules/task/features/TaskView/models'
import {
  getTaskJournalCsvUrl,
  getTaskJournalUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getGetJournalMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskJournalUrl(taskId))

const getGetJournalCsvMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskJournalCsvUrl(taskId))

export const mockGetJournalSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<GetTaskJournalResponseModel>>,
) => {
  const mockGetJournal = getSuccessMockFn(getGetJournalMockFn(taskId), options)
  mockGetJournal()
}

export const mockGetJournalServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockGetJournal = getServerErrorMockFn(
    getGetJournalMockFn(taskId),
    options,
  )
  mockGetJournal()
}

export const mockGetJournalCsvSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => {
  const mockGetJournalCsv = getSuccessMockFn(
    getGetJournalCsvMockFn(taskId),
    options,
  )

  mockGetJournalCsv()
}

export const mockGetJournalCsvServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockGetJournalCsv = getServerErrorMockFn(
    getGetJournalCsvMockFn(taskId),
    options,
  )

  mockGetJournalCsv()
}
