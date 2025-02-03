import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetFaChangeTypesCatalogQueryArgs,
  GetFaChangeTypesCatalogSuccessResponse,
} from 'shared/catalogs/api/endpoints/faChangeTypes/schemas'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const faChangeTypesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFaChangeTypesCatalog: build.query<
      GetFaChangeTypesCatalogSuccessResponse,
      MaybeUndefined<GetFaChangeTypesCatalogQueryArgs>
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetFaChangeTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetFaChangeTypesCatalogQuery } = faChangeTypesCatalogEndpoints
