import { IdType } from 'shared/types/common'

import { ResolutionClassificationsCatalogDTO } from './resolutionClassificationsCatalog.dto'

export type GetResolutionClassificationsCatalogQueryArgs = {
  supportGroup: IdType
}

export type GetResolutionClassificationsCatalogSuccessResponse = ResolutionClassificationsCatalogDTO
