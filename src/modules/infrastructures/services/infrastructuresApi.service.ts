import {
  GetInfrastructureQueryArgs,
  GetInfrastructureSuccessResponse,
} from 'modules/infrastructures/models'
import { makeGetInfrastructureUrl } from 'modules/infrastructures/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const infrastructuresApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getInfrastructure: build.query<GetInfrastructureSuccessResponse, GetInfrastructureQueryArgs>({
      query: ({ infrastructureId }) => ({
        url: makeGetInfrastructureUrl({ infrastructureId }),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetInfrastructureQuery } = infrastructuresApiService
