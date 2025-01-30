import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetInfrastructureWorkTypesQueryArgs,
  GetInfrastructureWorkTypesSuccessResponse,
} from 'shared/catalogs/models/infrastructureWorkTypes'
import { HttpMethodEnum } from 'shared/constants/http'

const infrastructureWorkTypesCatalogEndpoints = baseApiService.injectEndpoints({
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
