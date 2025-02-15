import { ResolutionClassificationsCatalogDTO } from 'shared/catalogs/resolutionClassifications/api/dto'
import { IdType } from 'shared/types/common'

export type GetResolutionClassificationsCatalogRequest = {
  supportGroup: IdType
}

export type GetResolutionClassificationsCatalogResponse = ResolutionClassificationsCatalogDTO
