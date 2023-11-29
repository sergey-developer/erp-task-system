import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentCategoryModel, EquipmentModel, NomenclatureModel } from 'modules/warehouse/models'

import { MaybeUndefined } from 'shared/types/utils'

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
  equipment?: EquipmentModel,
  nomenclature?: NomenclatureModel,
): MaybeUndefined<EquipmentFormModalProps['initialValues']> =>
  equipment
    ? {
        nomenclature: equipment.nomenclature.id,
        condition: equipment.condition,
        category: equipment.category.id,
        purpose: equipment.purpose.id,
        isNew: equipment.isNew,
        isWarranty: equipment.isWarranty,
        isRepaired: equipment.isRepaired,
        title: nomenclature?.title,
        warehouse: equipment.warehouse?.id,
        currency: equipment.currency?.id,
        customerInventoryNumber: equipment.customerInventoryNumber || undefined,
        serialNumber: equipment.serialNumber || undefined,
        quantity: equipment.quantity || undefined,
        price: equipment.price || undefined,
        usageCounter: equipment.usageCounter || undefined,
        owner: equipment.owner?.id,
        comment: equipment.comment || undefined,
      }
    : undefined
