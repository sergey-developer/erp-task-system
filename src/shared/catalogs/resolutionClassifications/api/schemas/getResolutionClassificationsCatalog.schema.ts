import { ResolutionClassificationsCatalogDTO } from 'shared/catalogs/api/dto/resolutionClassifications'
import { IdType } from 'shared/types/common'

export type GetResolutionClassificationsCatalogRequest = {
  supportGroup: IdType
}

export type GetResolutionClassificationsCatalogResponse = ResolutionClassificationsCatalogDTO
