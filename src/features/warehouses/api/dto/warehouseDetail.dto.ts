import { WarehouseTypeEnum } from 'features/warehouses/api/constants'

import { MacroregionCatalogItemDTO } from 'shared/catalogs/macroregions/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type WarehouseDetailDTO = {
  id: IdType
  type: WarehouseTypeEnum
  title: string
  legalEntity: {
    id: IdType
    title: string
  }
  address: string
  parent: MaybeNull<{
    id: IdType
    title: string
  }>
  contract: MaybeNull<string>
  notes: MaybeNull<string>
  macroregions: MaybeNull<Pick<MacroregionCatalogItemDTO, 'id' | 'title'>[]>
}
