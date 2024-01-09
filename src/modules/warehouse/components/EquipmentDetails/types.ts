import { DrawerProps } from 'antd'

import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type FieldsMaybeHidden = keyof Pick<
  EquipmentModel,
  'inventoryNumber' | 'isNew' | 'isWarranty' | 'isRepaired' | 'usageCounter' | 'owner'
>

export type EquipmentDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'open'>> & {
  equipmentId: IdType
}
