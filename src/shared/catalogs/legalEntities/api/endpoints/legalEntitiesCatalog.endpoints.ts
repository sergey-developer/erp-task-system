import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import { HttpMethodEnum } from 'shared/constants/http'

import { GetLegalEntitiesCatalogRequest, GetLegalEntitiesCatalogResponse } from '../schemas'

const legalEntitiesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLegalEntitiesCatalog: build.query<
      GetLegalEntitiesCatalogResponse,
      GetLegalEntitiesCatalogRequest
    >({
      query: () => ({
        url: CatalogApiPathsEnum.GetLegalEntities,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetLegalEntitiesCatalogQuery } = legalEntitiesCatalogEndpoints
