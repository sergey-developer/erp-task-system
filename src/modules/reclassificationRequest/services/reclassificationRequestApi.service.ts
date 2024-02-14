import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

import {
  CancelReclassificationRequestMutationArgs,
  CancelReclassificationRequestSuccessResponse,
} from '../models'
import { cancelReclassificationRequestUrl } from '../utils/apiUrls'

const reclassificationRequestApiService = baseApiService.injectEndpoints({
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
