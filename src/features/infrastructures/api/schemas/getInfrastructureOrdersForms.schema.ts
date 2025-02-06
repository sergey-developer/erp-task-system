import { IdType } from 'shared/types/common'

import { InfrastructureOrdersFormsDTO } from '../dto/infrastructureOrdersForms.dto'

export type GetInfrastructureOrdersFormsQueryArgs = {
  infrastructureProject: IdType
}

export type GetInfrastructureOrdersFormsSuccessResponse = InfrastructureOrdersFormsDTO
