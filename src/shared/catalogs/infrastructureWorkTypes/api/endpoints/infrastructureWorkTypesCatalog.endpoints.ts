import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetInfrastructureWorkTypesCatalogRequest,
  GetInfrastructureWorkTypesCatalogResponse,
} from 'shared/catalogs/api/endpoints/infrastructureWorkTypes/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const infrastructureWorkTypesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getInfrastructureWorkTypesCatalog: build.query<
      GetInfrastructureWorkTypesCatalogResponse,
      GetInfrastructureWorkTypesCatalogRequest
    >({
      query: () => ({
        url: CatalogApiPathsEnum.GetInfrastructureWorkTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetInfrastructureWorkTypesCatalogQuery } = infrastructureWorkTypesCatalogEndpoints
