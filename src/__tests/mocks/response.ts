import {
  ResponseResolver as BaseResponseResolver,
  MockedRequest,
  ResponseTransformer,
  RestContext,
} from 'msw'

import { API_RESPONSE_DELAY } from '__tests/constants/api'
import { HttpStatusCodeEnum } from 'shared/constants/http'

export type ResponseResolver = BaseResponseResolver<MockedRequest, RestContext>

export type ResponseResolverOptions = {
  status: HttpStatusCodeEnum
  body?: any
  once?: boolean
  delay?: number
}

export const getResponseResolver = ({
  status,
  body,
  once = true,
  delay = API_RESPONSE_DELAY,
}: ResponseResolverOptions): ResponseResolver => {
  return (req, res, ctx) => {
    const transformers: ResponseTransformer[] = [ctx.status(status)]

    if (body) transformers.push(ctx.json(body))
    if (delay) transformers.push(ctx.delay(delay))

    return once
      ? res.once.apply(null, transformers)
      : res.apply(null, transformers)
  }
}
