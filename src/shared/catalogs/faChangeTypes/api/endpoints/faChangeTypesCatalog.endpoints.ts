import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetFaChangeTypesCatalogRequest,
  GetFaChangeTypesCatalogResponse,
} from 'shared/catalogs/api/endpoints/faChangeTypes/schemas'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const faChangeTypesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFaChangeTypesCatalog: build.query<
      GetFaChangeTypesCatalogResponse,
      MaybeUndefined<GetFaChangeTypesCatalogRequest>
    >({
      query: () => ({
        url: CatalogApiPathsEnum.GetFaChangeTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetFaChangeTypesCatalogQuery } = faChangeTypesCatalogEndpoints
