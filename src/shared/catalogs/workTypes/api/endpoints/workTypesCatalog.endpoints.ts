import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

import { GetWorkTypesCatalogQueryArgs, GetWorkTypesCatalogSuccessResponse } from '../schemas'

const workTypesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkTypesCatalog: build.query<
      GetWorkTypesCatalogSuccessResponse,
      MaybeUndefined<GetWorkTypesCatalogQueryArgs>
    >({
      query: (params) => ({
        url: CatalogEndpointsEnum.GetWorkTypes,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetWorkTypesCatalogQuery } = workTypesCatalogEndpoints
