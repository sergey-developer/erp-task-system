import { MockedRequest, ResponseResolver, RestContext, rest } from 'msw'

import api from '__tests__/mocks/api'
import { makeAbsoluteApiUrl } from 'shared/services/api'

export const mockRefreshToken =
  (resolver: ResponseResolver<MockedRequest, RestContext>) => () => {
    api.use(rest.post(makeAbsoluteApiUrl('/user/refresh'), resolver))
  }
