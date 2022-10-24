import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { generateId } from '_tests_/utils'
import { TaskJournalModel } from 'modules/task/features/TaskView/models'
import {
  getTaskJournalCsvUrl,
  getTaskJournalUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

export const FAKE_TASK_ID = generateId()

const getJournalMockFn = getRequestMockFn(
  HttpMethodEnum.Get,
  getTaskJournalUrl(FAKE_TASK_ID),
)

const getJournalCsvMockFn = getRequestMockFn(
  HttpMethodEnum.Get,
  getTaskJournalCsvUrl(FAKE_TASK_ID),
)

export const mockGetJournalSuccess = (response: TaskJournalModel) => {
  const mockGetJournal = getSuccessMockFn(getJournalMockFn, { body: response })
  mockGetJournal()
}

export const mockGetJournalCsvSuccess = getSuccessMockFn(getJournalCsvMockFn)

export const mockGetJournalCsvServerError =
  getServerErrorMockFn(getJournalCsvMockFn)

export const mockGetJournalServerError = getServerErrorMockFn(getJournalMockFn)
