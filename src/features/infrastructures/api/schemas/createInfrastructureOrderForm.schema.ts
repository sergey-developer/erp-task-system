import { IdType } from 'shared/types/common'

export type CreateInfrastructureOrderFormRequest = {
  infrastructureProject: IdType
  urgencyRateType: IdType
  attachments?: IdType[]
}

export type CreateInfrastructureOrderFormResponse = { id: IdType }
