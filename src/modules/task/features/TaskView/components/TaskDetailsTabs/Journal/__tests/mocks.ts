import { getRequestMocker, getServerErrorMocker } from '__tests/mocks/request'
import { getResponseResolver } from '__tests/mocks/response'
import { generateId } from '__tests/utils'
import { getTaskJournalUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'

import { FakeJournalResponse } from './constants'

const getJournalMocker = getRequestMocker(
  HttpMethodEnum.Get,
  getTaskJournalUrl(generateId()),
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
