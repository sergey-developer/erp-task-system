import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type FaChangeTypeCatalogItemDTO = {
  id: IdType
  title: string
  isDefault: MaybeNull<boolean>
}

export type FaChangeTypesCatalogDTO = FaChangeTypeCatalogItemDTO[]
