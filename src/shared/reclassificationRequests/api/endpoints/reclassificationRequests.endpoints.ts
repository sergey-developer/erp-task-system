import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import { makeCancelReclassificationRequestApiPath } from '../helpers'
import {
  CancelReclassificationRequestRequest,
  CancelReclassificationRequestResponse,
} from '../schemas'

const reclassificationRequestsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cancelReclassificationRequest: build.mutation<
      CancelReclassificationRequestResponse,
      CancelReclassificationRequestRequest
    >({
      query: ({ reclassificationRequestId }) => ({
        url: makeCancelReclassificationRequestApiPath(reclassificationRequestId),
        method: HttpMethodEnum.Post,
      }),
    }),
  }),
})

export const { useCancelReclassificationRequestMutation, endpoints } =
  reclassificationRequestsEndpoints
