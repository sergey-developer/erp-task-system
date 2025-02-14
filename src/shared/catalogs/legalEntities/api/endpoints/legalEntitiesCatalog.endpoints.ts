import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  GetLegalEntitiesCatalogRequest,
  GetLegalEntitiesCatalogResponse,
} from '../schemas'

const legalEntitiesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLegalEntitiesCatalog: build.query<
      GetLegalEntitiesCatalogResponse,
      GetLegalEntitiesCatalogRequest
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetLegalEntities,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetLegalEntitiesCatalogQuery } = legalEntitiesCatalogEndpoints
