import { getRequestMocker, getServerErrorMocker } from '__tests/mocks/request'
import { getResponseResolver } from '__tests/mocks/response'
import { getTaskJournalUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'

import { FAKE_TASK_ID, FakeJournalResponse } from './constants'

const getJournalMocker = getRequestMocker(
  HttpMethodEnum.Get,
  getTaskJournalUrl(FAKE_TASK_ID),
)

export const mockGetJournalSuccess = (response: FakeJournalResponse) => {
  const mockGetJournal = getJournalMocker(
    getResponseResolver({
      status: HttpStatusCodeEnum.Ok,
      body: response,
    }),
  )

  mockGetJournal()
}

export const mockGetJournalServerError = getServerErrorMocker(getJournalMocker)
