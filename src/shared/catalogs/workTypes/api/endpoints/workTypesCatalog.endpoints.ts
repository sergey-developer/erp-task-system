import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

import { GetWorkTypesCatalogRequest, GetWorkTypesCatalogResponse } from '../schemas'

const workTypesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkTypesCatalog: build.query<
      GetWorkTypesCatalogResponse,
      MaybeUndefined<GetWorkTypesCatalogRequest>
    >({
      query: (params) => ({
        url: CatalogApiPathsEnum.GetWorkTypes,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetWorkTypesCatalogQuery } = workTypesCatalogEndpoints
