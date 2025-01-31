import { HttpMethodEnum } from 'shared/constants/http'
import { baseApi } from 'shared/api/baseApi'

import {
  CancelReclassificationRequestMutationArgs,
  CancelReclassificationRequestSuccessResponse,
} from '../models'
import { cancelReclassificationRequestUrl } from '../utils/apiUrls'

const reclassificationRequestApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cancelReclassificationRequest: build.mutation<
      CancelReclassificationRequestSuccessResponse,
      CancelReclassificationRequestMutationArgs
    >({
      query: ({ reclassificationRequestId }) => ({
        url: cancelReclassificationRequestUrl(reclassificationRequestId),
        method: HttpMethodEnum.Post,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCancelReclassificationRequestMutation, endpoints } =
  reclassificationRequestApiService
