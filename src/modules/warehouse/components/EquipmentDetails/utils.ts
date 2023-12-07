import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentCategoryModel, EquipmentModel, NomenclatureModel } from 'modules/warehouse/models'

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
    nomenclature: Pick<EquipmentModel['nomenclature'], 'id'>
    category: Pick<EquipmentModel['category'], 'id'>
    purpose: Pick<EquipmentModel['purpose'], 'id'>
    warehouse: Pick<NonNullable<EquipmentModel['warehouse']>, 'id'>
    currency: Pick<NonNullable<EquipmentModel['currency']>, 'id'>
    owner: Pick<NonNullable<EquipmentModel['owner']>, 'id'>
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
  nomenclature?: Partial<Pick<NomenclatureModel, 'title'>>,
): EquipmentFormModalProps['initialValues'] =>
  equipment
    ? {
        nomenclature: equipment.nomenclature?.id,
        condition: equipment.condition || undefined,
        category: equipment.category?.id,
        purpose: equipment.purpose?.id,
        isNew: equipment.isNew || undefined,
        isWarranty: equipment.isWarranty || undefined,
        isRepaired: equipment.isRepaired || undefined,
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
    : {}
