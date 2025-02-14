import { RequestWithInfrastructure } from 'features/infrastructures/api/types'

import { InfrastructureDTO } from '../dto/infrastructure.dto'

export type GetInfrastructureRequest = RequestWithInfrastructure
export type GetInfrastructureResponse = InfrastructureDTO
