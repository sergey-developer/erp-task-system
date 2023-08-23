import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import { WarehouseListModel } from 'modules/warehouse/models'

export type EquipmentNomenclatureListFilterFormFields = Partial<{
  conditions: EquipmentConditionEnum[]
  warehouses: number[]
  owners: number[]
  categories: number[]
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean
  priceFrom: number
  priceTo: number
  createdAt: [Moment, Moment]
}>

export type EquipmentNomenclatureListFilterProps = {
  visible: boolean

  values?: EquipmentNomenclatureListFilterFormFields
  initialValues: EquipmentNomenclatureListFilterFormFields

  warehouseList: WarehouseListModel
  // todo: поменять во время интеграции с бэком
  categoryList: any[]
  ownerList: any[]

  onApply: (values: EquipmentNomenclatureListFilterFormFields) => void
  onClose: () => void
}
