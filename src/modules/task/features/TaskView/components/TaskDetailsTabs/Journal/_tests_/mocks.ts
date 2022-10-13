import {
  getRequestMocker,
  getServerErrorMocker,
  getSuccessMocker,
} from '_tests_/mocks/request'
import { getResponseResolver } from '_tests_/mocks/response'
import { generateId } from '_tests_/utils'
import { TaskJournalModel } from 'modules/task/features/TaskView/models'
import {
  getTaskJournalCsvUrl,
  getTaskJournalUrl,
} from 'modules/task/utils/apiUrls'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'

export const FAKE_TASK_ID = generateId()

const getJournalMocker = getRequestMocker(
  HttpMethodEnum.Get,
  getTaskJournalUrl(FAKE_TASK_ID),
)

const getJournalCsvMocker = getRequestMocker(
  HttpMethodEnum.Get,
  getTaskJournalCsvUrl(FAKE_TASK_ID),
)

export const mockGetJournalSuccess = (response: TaskJournalModel) => {
  const mockGetJournal = getJournalMocker(
    getResponseResolver({
      status: HttpCodeEnum.Ok,
      body: response,
    }),
  )

  mockGetJournal()
}

export const mockGetJournalCsvSuccess = getSuccessMocker(getJournalCsvMocker)

export const mockGetJournalCsvServerError =
  getServerErrorMocker(getJournalCsvMocker)

export const mockGetJournalServerError = getServerErrorMocker(getJournalMocker)
