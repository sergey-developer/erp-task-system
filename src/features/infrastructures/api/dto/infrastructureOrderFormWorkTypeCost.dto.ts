import { InfrastructureWorkTypeDTO } from 'features/infrastructures/api/dto/infrastructureWorkType.dto'

export type InfrastructureOrderFormWorkTypeCostDTO = {
  type: InfrastructureWorkTypeDTO
  cost: number
}
