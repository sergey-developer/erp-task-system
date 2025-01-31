import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetInfrastructureWorkTypesQueryArgs,
  GetInfrastructureWorkTypesSuccessResponse,
} from 'shared/catalogs/api/dto/infrastructureWorkTypes'
import { HttpMethodEnum } from 'shared/constants/http'

const infrastructureWorkTypesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getInfrastructureWorkTypesCatalog: build.query<
      GetInfrastructureWorkTypesSuccessResponse,
      GetInfrastructureWorkTypesQueryArgs
    >({
      query: () => ({
        url: CatalogsApiEnum.GetInfrastructureWorkTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetInfrastructureWorkTypesCatalogQuery } = infrastructureWorkTypesCatalogEndpoints
