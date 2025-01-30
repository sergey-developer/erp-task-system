import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetFaChangeTypesQueryArgs,
  GetFaChangeTypesSuccessResponse,
} from 'shared/catalogs/models/faChangeTypes'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const faChangeTypesCatalogEndpoints = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getFaChangeTypesCatalog: build.query<
      GetFaChangeTypesSuccessResponse,
      MaybeUndefined<GetFaChangeTypesQueryArgs>
    >({
      query: () => ({
        url: CatalogsApiEnum.GetFaChangeTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetFaChangeTypesCatalogQuery } = faChangeTypesCatalogEndpoints
