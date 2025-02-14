import { EquipmentConditionEnum } from 'features/equipments/api/constants'

import { LocationCatalogItemDTO } from 'shared/catalogs/locations/api/dto'
import { WorkTypesCatalogItemDTO } from 'shared/catalogs/workTypes/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { EquipmentCategoryDTO } from './equipmentCategories.dto'

export type EquipmentDTO = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  quantity: number
  category: Pick<EquipmentCategoryDTO, 'id' | 'title'>
  purpose: Pick<WorkTypesCatalogItemDTO, 'id' | 'title'>
  isCredited: boolean

  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  location: MaybeNull<Pick<LocationCatalogItemDTO, 'id' | 'title'>>
}

export type EquipmentsDTO = EquipmentDTO[]
