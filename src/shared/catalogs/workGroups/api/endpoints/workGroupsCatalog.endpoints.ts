import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { HttpMethodEnum } from 'shared/constants/http'

import { GetWorkGroupsCatalogRequest, GetWorkGroupsCatalogResponse } from '../schemas'

const workGroupsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupsCatalog: build.query<GetWorkGroupsCatalogResponse, GetWorkGroupsCatalogRequest>({
      query: () => ({
        url: CatalogApiPathsEnum.GetWorkGroups,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWorkGroupsCatalogQuery } = workGroupsCatalogEndpoints
