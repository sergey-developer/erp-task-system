import { DrawerProps } from 'antd'
import { EquipmentDetailDTO } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'

export type FieldsMaybeHidden = keyof Pick<
  EquipmentDetailDTO,
  'inventoryNumber' | 'isNew' | 'isWarranty' | 'isRepaired' | 'usageCounter' | 'owner'
>

export type EquipmentDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'open'>> & {
  equipmentId: IdType
}
