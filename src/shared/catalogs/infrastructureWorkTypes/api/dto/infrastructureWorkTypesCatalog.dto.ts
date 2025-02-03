import { IdType } from 'shared/types/common'

export type InfrastructureWorkTypesCatalogItemDTO = {
  id: IdType
  title: string
}

export type InfrastructureWorkTypesCatalogDTO = InfrastructureWorkTypesCatalogItemDTO[]
