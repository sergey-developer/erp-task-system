import { IdType } from 'shared/types/common'

export type CreateInfrastructureOrderFormMutationArgs = {
  infrastructureProject: IdType
  urgencyRateType: IdType
  attachments?: IdType[]
}

export type CreateInfrastructureOrderFormSuccessResponse = { id: IdType }
