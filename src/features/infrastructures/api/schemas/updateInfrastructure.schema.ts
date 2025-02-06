import { InfrastructureRequestArgs } from 'features/infrastructures/types'

import { IdType } from 'shared/types/common'

import { InfrastructureDTO } from '../dto/infrastructure.dto'

export type UpdateInfrastructureMutationArgs = InfrastructureRequestArgs &
  Partial<{
    manager: IdType
  }>

export type UpdateInfrastructureSuccessResponse = Pick<InfrastructureDTO, 'id' | 'manager'>
