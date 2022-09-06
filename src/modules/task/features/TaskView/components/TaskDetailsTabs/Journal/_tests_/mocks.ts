import { getRequestMocker, getServerErrorMocker } from '_tests_/mocks/request'
import { getResponseResolver } from '_tests_/mocks/response'
import { TaskJournalModel } from 'modules/task/features/TaskView/models'
import { getTaskJournalUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'

import { FAKE_TASK_ID } from './constants'

const getJournalMocker = getRequestMocker(
  HttpMethodEnum.Get,
  getTaskJournalUrl(FAKE_TASK_ID),
)

export const mockGetJournalSuccess = (response: TaskJournalModel) => {
  const mockGetJournal = getJournalMocker(
    getResponseResolver({
      status: HttpStatusCodeEnum.Ok,
      body: response,
    }),
  )

  mockGetJournal()
}

export const mockGetJournalServerError = getServerErrorMocker(getJournalMocker)
