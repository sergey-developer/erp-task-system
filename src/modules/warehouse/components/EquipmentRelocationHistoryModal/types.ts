import { TableProps } from 'antd'

import { EquipmentRelocationHistoryItemModel } from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type EquipmentRelocationHistoryTableItem = Pick<
  EquipmentRelocationHistoryItemModel,
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
