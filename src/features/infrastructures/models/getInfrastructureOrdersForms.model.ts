import { IdType } from 'shared/types/common'

import { InfrastructureOrdersFormsModel } from './infrastructureOrdersForms.model'

export type GetInfrastructureOrdersFormsQueryArgs = {
  infrastructureProject: IdType
}

export type GetInfrastructureOrdersFormsSuccessResponse = InfrastructureOrdersFormsModel
