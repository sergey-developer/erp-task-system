import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'

import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerModel,
  EquipmentCategoryModel,
  EquipmentModel,
  NomenclatureModel,
  WarehouseModel,
  WorkTypeModel,
} from 'modules/warehouse/models'

import { CurrencyModel } from 'shared/models/currency'
import { MaybeNull } from 'shared/types/utils'

import { FieldsMaybeHidden } from './types'

export const getHiddenFieldsByCategory = (
  category: EquipmentCategoryModel,
): FieldsMaybeHidden[] => {
  if (!category.code) return []

  switch (category.code) {
    case EquipmentCategoryEnum.Consumable:
      return [
        'customerInventoryNumber',
        'inventoryNumber',
        'isNew',
        'isWarranty',
        'isRepaired',
        'usageCounter',
        'owner',
      ]
    case EquipmentCategoryEnum.Equipment:
    case EquipmentCategoryEnum.CoreResources:
      return []
  }
}

export const getEquipmentFormInitialValues = (
  equipment?: Partial<{
    nomenclature: Pick<NomenclatureModel, 'id' | 'title'>
    category: Pick<EquipmentCategoryModel, 'id'>
    purpose: Pick<WorkTypeModel, 'id'>
    warehouse: MaybeNull<Pick<WarehouseModel, 'id'>>
    currency: MaybeNull<Pick<CurrencyModel, 'id'>>
    owner: MaybeNull<Pick<CustomerModel, 'id'>>
    condition: EquipmentModel['condition']
    isNew: EquipmentModel['isNew']
    isWarranty: EquipmentModel['isWarranty']
    isRepaired: EquipmentModel['isRepaired']
    customerInventoryNumber: EquipmentModel['customerInventoryNumber']
    serialNumber: EquipmentModel['serialNumber']
    quantity: EquipmentModel['quantity']
    price: EquipmentModel['price']
    usageCounter: EquipmentModel['usageCounter']
    comment: EquipmentModel['comment']
  }>,
): EquipmentFormModalProps['initialValues'] =>
  equipment
    ? {
        nomenclature: equipment.nomenclature?.id,
        condition: equipment.condition || undefined,
        category: equipment.category?.id,
        purpose: equipment.purpose?.id,
        isNew: isBoolean(equipment.isNew) ? equipment.isNew : undefined,
        isWarranty: isBoolean(equipment.isWarranty) ? equipment.isWarranty : undefined,
        isRepaired: isBoolean(equipment.isRepaired) ? equipment.isRepaired : undefined,
        title: equipment.nomenclature?.title,
        warehouse: equipment.warehouse?.id,
        currency: equipment.currency?.id,
        customerInventoryNumber: equipment.customerInventoryNumber || undefined,
        serialNumber: equipment.serialNumber || undefined,
        quantity: isNumber(equipment.quantity) ? equipment.quantity : undefined,
        price: isNumber(equipment.price) ? equipment.price : undefined,
        usageCounter: isNumber(equipment.usageCounter) ? equipment.usageCounter : undefined,
        owner: equipment.owner?.id,
        comment: equipment.comment || undefined,
      }
    : {}
