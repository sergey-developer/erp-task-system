import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetInfrastructureWorkTypesCatalogQueryArgs,
  GetInfrastructureWorkTypesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/infrastructureWorkTypes'
import { HttpMethodEnum } from 'shared/constants/http'

const infrastructureWorkTypesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getInfrastructureWorkTypesCatalog: build.query<
      GetInfrastructureWorkTypesCatalogSuccessResponse,
      GetInfrastructureWorkTypesCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetInfrastructureWorkTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetInfrastructureWorkTypesCatalogQuery } = infrastructureWorkTypesCatalogEndpoints
