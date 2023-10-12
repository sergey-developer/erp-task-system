import { DrawerProps } from 'antd'

import { EquipmentModel } from 'modules/warehouse/models'

export type FieldsMaybeHidden = keyof Pick<
  EquipmentModel,
  | 'customerInventoryNumber'
  | 'inventoryNumber'
  | 'isNew'
  | 'isWarranty'
  | 'isRepaired'
  | 'usageCounter'
  | 'owner'
>

export type EquipmentDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'open'>> &
  Pick<DrawerProps, 'title'> & {
    equipment?: Pick<
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
    equipmentIsLoading: boolean

    onClickEdit: () => void

    hiddenFields?: FieldsMaybeHidden[]
  }
