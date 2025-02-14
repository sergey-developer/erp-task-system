import { RequestWithInfrastructure } from 'features/infrastructures/api/types'

import { IdType } from 'shared/types/common'

import { InfrastructureDTO } from '../dto/infrastructure.dto'

export type UpdateInfrastructureRequest = RequestWithInfrastructure &
  Partial<{
    manager: IdType
  }>

export type UpdateInfrastructureResponse = Pick<InfrastructureDTO, 'id' | 'manager'>
