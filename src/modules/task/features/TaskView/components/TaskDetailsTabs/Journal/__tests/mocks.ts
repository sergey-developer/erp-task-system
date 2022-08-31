import { API_RESPONSE_DELAY, FAKE_ID } from '__tests/constants'
import { getRequestMocker } from '__tests/mocks/request'
import { getTaskJournalUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'

import { FakeJournalResponse } from './constants'

const getJournalMocker = getRequestMocker(
  HttpMethodEnum.Get,
  getTaskJournalUrl(FAKE_ID),
)

export const mockGetJournalSuccess = (response: FakeJournalResponse) => {
  const mockGetJournal = getJournalMocker((req, res, ctx) =>
    res.once(
      ctx.status(HttpStatusCodeEnum.Ok),
      ctx.json(response),
      ctx.delay(API_RESPONSE_DELAY),
    ),
  )

  mockGetJournal()
}

export const mockGetJournalServerError = getJournalMocker((req, res, ctx) =>
  res.once(
    ctx.status(HttpStatusCodeEnum.ServerError),
    ctx.delay(API_RESPONSE_DELAY),
  ),
)
