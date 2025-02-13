import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  GetLegalEntitiesCatalogQueryArgs,
  GetLegalEntitiesCatalogSuccessResponse,
} from '../schemas'

const legalEntitiesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLegalEntitiesCatalog: build.query<
      GetLegalEntitiesCatalogSuccessResponse,
      GetLegalEntitiesCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetLegalEntities,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetLegalEntitiesCatalogQuery } = legalEntitiesCatalogEndpoints
