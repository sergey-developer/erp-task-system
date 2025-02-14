import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { RelocationTaskModel } from 'features/warehouse/models'

import { LocationCatalogItemDTO } from 'shared/catalogs/locations/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type HistoryNomenclatureOperationsReportItemDTO = {
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
  location: MaybeNull<Pick<LocationCatalogItemDTO, 'id' | 'title'>>
}

export type HistoryNomenclatureOperationsReportDTO = HistoryNomenclatureOperationsReportItemDTO[]
