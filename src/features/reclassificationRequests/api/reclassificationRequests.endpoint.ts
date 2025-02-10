import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import { makeCancelReclassificationRequestEndpoint } from './helpers'
import {
  CancelReclassificationRequestMutationArgs,
  CancelReclassificationRequestSuccessResponse,
} from './schemas'

const reclassificationRequestsEndpoint = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cancelReclassificationRequest: build.mutation<
      CancelReclassificationRequestSuccessResponse,
      CancelReclassificationRequestMutationArgs
    >({
      query: ({ reclassificationRequestId }) => ({
        url: makeCancelReclassificationRequestEndpoint(reclassificationRequestId),
        method: HttpMethodEnum.Post,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCancelReclassificationRequestMutation, endpoints } =
  reclassificationRequestsEndpoint
