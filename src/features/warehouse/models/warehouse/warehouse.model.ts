import { WarehouseTypeEnum } from 'features/warehouse/constants/warehouse'

import { MacroregionListItemModel } from 'shared/models/macroregion'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type WarehouseModel = {
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
  macroregions: MaybeNull<Pick<MacroregionListItemModel, 'id' | 'title'>[]>
}
