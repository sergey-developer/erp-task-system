import { InfrastructuresApiEnum } from 'modules/infrastructures/constants'
import {
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureOrdersFormsSuccessResponse,
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

    getInfrastructureOrdersForms: build.query<
      GetInfrastructureOrdersFormsSuccessResponse,
      GetInfrastructureOrdersFormsQueryArgs
    >({
      query: (params) => ({
        url: InfrastructuresApiEnum.GetInfrastructureOrdersForms,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetInfrastructureQuery, useGetInfrastructureOrdersFormsQuery } =
  infrastructuresApiService
