import { IdType } from 'shared/types/common'

export type LegalEntityCatalogItemDTO = {
  id: IdType
  title: string
}

export type LegalEntitiesCatalogDTO = LegalEntityCatalogItemDTO[]
