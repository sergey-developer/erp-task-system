import { InfrastructureRequestArgs } from 'features/infrastructures/types'

import { IdType } from 'shared/types/common'

import { InfrastructureModel } from './infrastructure.model'

export type UpdateInfrastructureMutationArgs = InfrastructureRequestArgs &
  Partial<{
    manager: IdType
  }>

export type UpdateInfrastructureSuccessResponse = Pick<InfrastructureModel, 'id' | 'manager'>
