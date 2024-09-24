import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'

import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentCategoryModel, EquipmentModel } from 'modules/warehouse/models'

import { FieldsMaybeHidden } from './types'

export const getHiddenFieldsByCategory = (
  category: EquipmentCategoryModel,
): FieldsMaybeHidden[] => {
  if (!category.code) return []

  switch (category.code) {
    case EquipmentCategoryEnum.Consumable:
      return ['inventoryNumber', 'isNew', 'isWarranty', 'isRepaired', 'usageCounter', 'owner']
    case EquipmentCategoryEnum.Equipment:
    case EquipmentCategoryEnum.CoreResources:
      return []
  }
}

export const getEquipmentFormInitialValues = (
  equipment?: Partial<
    Pick<
      EquipmentModel,
      | 'condition'
      | 'category'
      | 'purpose'
      | 'isNew'
      | 'isWarranty'
      | 'isRepaired'
      | 'warehouse'
      | 'currency'
      | 'inventoryNumber'
      | 'serialNumber'
      | 'quantity'
      | 'price'
      | 'usageCounter'
      | 'owner'
      | 'comment'
      | 'location'
      | 'macroregion'
    > & {
      nomenclature: Pick<EquipmentModel['nomenclature'], 'id' | 'title'>
    }
  >,
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
        location: equipment.location?.id,
        macroregion: equipment.macroregion?.id,
        currency: equipment.currency?.id,
        inventoryNumber: equipment.inventoryNumber || undefined,
        serialNumber: equipment.serialNumber || undefined,
        quantity: isNumber(equipment.quantity) ? equipment.quantity : undefined,
        price: isNumber(equipment.price) ? equipment.price : undefined,
        usageCounter: isNumber(equipment.usageCounter) ? equipment.usageCounter : undefined,
        owner: equipment.owner?.id,
        ownerIsObermeister: equipment.owner ? false : undefined,
        comment: equipment.comment || undefined,
      }
    : {}
