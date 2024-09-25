import { EquipmentModel } from "modules/warehouse/models";
import { EquipmentFormModalProps } from "./types";
import isBoolean from "lodash/isBoolean";
import isNumber from "lodash/isNumber";

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