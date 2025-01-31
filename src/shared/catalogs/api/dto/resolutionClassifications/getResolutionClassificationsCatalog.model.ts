import { IdType } from 'shared/types/common'

import { ResolutionClassificationsCatalogModel } from './resolutionClassificationsCatalog.model'

export type GetResolutionClassificationsQueryArgs = {
  supportGroup: IdType
}

export type GetResolutionClassificationsSuccessResponse = ResolutionClassificationsCatalogModel
