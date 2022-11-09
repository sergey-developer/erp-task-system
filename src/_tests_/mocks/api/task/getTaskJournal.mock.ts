import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { GetTaskJournalResponseModel } from 'modules/task/features/TaskView/models'
import {
  getTaskJournalCsvUrl,
  getTaskJournalUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import { ResponseResolverOptions } from '../../response'

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
  response?: ErrorData<T>,
) => {
  const mockGetJournal = getServerErrorMockFn(getGetJournalMockFn(taskId), {
    body: response,
  })

  mockGetJournal()
}

export const mockGetJournalCsvSuccess = (taskId: number) => {
  const mockGetJournalCsv = getSuccessMockFn(getGetJournalCsvMockFn(taskId))
  mockGetJournalCsv()
}

export const mockGetJournalCsvServerError = <T extends object>(
  taskId: number,
  response?: ErrorData<T>,
) => {
  const mockGetJournalCsv = getServerErrorMockFn(
    getGetJournalCsvMockFn(taskId),
    { body: response },
  )

  mockGetJournalCsv()
}
