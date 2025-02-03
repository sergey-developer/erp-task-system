import { ResolutionClassificationsCatalogDTO } from 'shared/catalogs/api/dto/resolutionClassifications'
import { IdType } from 'shared/types/common'

export type GetResolutionClassificationsCatalogQueryArgs = {
  supportGroup: IdType
}

export type GetResolutionClassificationsCatalogSuccessResponse = ResolutionClassificationsCatalogDTO
