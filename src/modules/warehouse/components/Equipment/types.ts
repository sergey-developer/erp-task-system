import { DrawerProps } from 'antd'

import { EquipmentModel } from 'modules/warehouse/models'

export type FieldsDependOnCategory = keyof Pick<
  EquipmentModel,
  | 'customerInventoryNumber'
  | 'inventoryNumber'
  | 'isNew'
  | 'isWarranty'
  | 'isRepaired'
  | 'usageCounter'
  | 'owner'
>

export type EquipmentProps = Required<
  Pick<DrawerProps, 'onClose' | 'visible' | 'title'>
> & {
  equipment: Pick<
    EquipmentModel,
    | 'title'
    | 'category'
    | 'nomenclature'
    | 'serialNumber'
    | 'warehouse'
    | 'condition'
    | 'createdAt'
    | 'createdBy'
    | 'quantity'
    | 'measurementUnit'
    | 'price'
    | 'currency'
    | 'purpose'
    | 'comment'
    | 'customerInventoryNumber'
    | 'inventoryNumber'
    | 'isNew'
    | 'isWarranty'
    | 'isRepaired'
    | 'usageCounter'
    | 'owner'
  >
  displayableFields: FieldsDependOnCategory[]
}
