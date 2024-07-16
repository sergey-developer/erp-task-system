import { IdType } from 'shared/types/common'

import { ResolutionClassificationsModel } from './resolutionClassifications.model'

export type GetResolutionClassificationsQueryArgs = {
  supportGroup: IdType
}

export type GetResolutionClassificationsSuccessResponse = ResolutionClassificationsModel
