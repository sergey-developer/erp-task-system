import _curry from 'lodash/curry'
import { MockedRequest, ResponseResolver, RestContext, rest } from 'msw'

import { HttpMethodEnum } from 'shared/constants/http'
import { makeAbsoluteApiUrl } from 'shared/services/api'

import api from './api'

export const getRequestMocker = _curry(
  (
      method: HttpMethodEnum,
      url: string,
      resolver: ResponseResolver<MockedRequest, RestContext>,
    ) =>
    () => {
      api.use(rest[method](makeAbsoluteApiUrl(url), resolver))
    },
)
