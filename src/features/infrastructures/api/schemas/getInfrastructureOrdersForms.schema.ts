import { IdType } from 'shared/types/common'

import { InfrastructureOrdersFormsDTO } from '../dto/infrastructureOrdersForms.dto'

export type GetInfrastructureOrdersFormsRequest = {
  infrastructureProject: IdType
}

export type GetInfrastructureOrdersFormsResponse = InfrastructureOrdersFormsDTO
