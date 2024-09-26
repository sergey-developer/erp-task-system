import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'

import { EquipmentModel } from 'modules/warehouse/models'

import { CheckEquipmentFormModalProps } from './types'

export const getCheckEquipmentFormInitialValues = (
  equipment?: Partial<
    Pick<
      EquipmentModel,
      | 'condition'
      | 'category'
      | 'purpose'
      | 'isNew'
      | 'isWarranty'
      | 'isRepaired'
      | 'location'
      | 'currency'
      | 'inventoryNumber'
      | 'serialNumber'
      | 'quantity'
      | 'price'
      | 'usageCounter'
      | 'owner'
      | 'comment'
      | 'macroregion'
      | 'title'
    > & {
      nomenclature: Pick<EquipmentModel['nomenclature'], 'id' | 'title'>
    }
  >,
): CheckEquipmentFormModalProps['initialValues'] =>
  equipment
    ? {
        nomenclature: equipment.nomenclature?.id,
        condition: equipment.condition || undefined,
        category: equipment.category?.id,
        purpose: equipment.purpose?.id,
        isNew: isBoolean(equipment.isNew) ? equipment.isNew : undefined,
        isWarranty: isBoolean(equipment.isWarranty) ? equipment.isWarranty : undefined,
        isRepaired: isBoolean(equipment.isRepaired) ? equipment.isRepaired : undefined,
        title: equipment.title,
        location: equipment.location?.id,
        macroregion: equipment.macroregion?.id,
        currency: equipment.currency?.id,
        inventoryNumber: equipment.inventoryNumber || undefined,
        serialNumber: equipment.serialNumber || undefined,
        quantity: isNumber(equipment.quantity) ? equipment.quantity : undefined,
        price: isNumber(equipment.price) ? equipment.price : undefined,
        usageCounter: isNumber(equipment.usageCounter) ? equipment.usageCounter : undefined,
        owner: equipment.owner?.id,
        comment: equipment.comment || undefined,
      }
    : {}
