import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskModel } from 'modules/warehouse/models'

import { LocationCatalogListItemModel } from 'shared/models/catalogs/locations'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type HistoryNomenclatureOperationsReportListItemModel = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean
  lastRelocationTask: Pick<RelocationTaskModel, 'id' | 'createdAt' | 'status'>

  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  creditedAt: MaybeNull<string>
  location: MaybeNull<Pick<LocationCatalogListItemModel, 'id' | 'title'>>
}

export type HistoryNomenclatureOperationsReportModel =
  HistoryNomenclatureOperationsReportListItemModel[]
