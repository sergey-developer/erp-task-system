import { TableProps } from 'antd'
import { EquipmentRelocationHistoryItemDTO } from 'features/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type EquipmentRelocationHistoryTableItem = Pick<
  EquipmentRelocationHistoryItemDTO,
  | 'id'
  | 'createdAt'
  | 'completedAt'
  | 'relocateFrom'
  | 'relocateTo'
  | 'createdBy'
  | 'status'
  | 'documents'
  | 'externalRelocation'
>

export type EquipmentRelocationHistoryModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel'> &
    Pick<TableProps<EquipmentRelocationHistoryTableItem>, 'dataSource' | 'loading' | 'onRow'>
>
