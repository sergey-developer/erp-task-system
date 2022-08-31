import { API_RESPONSE_DELAY, FAKE_ID } from '__tests__/constants'
import { getRequestMocker } from '__tests__/mocks/request'
import { getTaskJournalUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'

import { FakeJournalResponse } from './constants'

const mockGetJournal = getRequestMocker(
  HttpMethodEnum.GET,
  getTaskJournalUrl(FAKE_ID),
)

export const mockGetJournalSuccess = (response: FakeJournalResponse) =>
  mockGetJournal((req, res, ctx) =>
    res.once(
      ctx.status(HttpStatusCodeEnum.Ok),
      ctx.json(response),
      ctx.delay(API_RESPONSE_DELAY),
    ),
  )()
