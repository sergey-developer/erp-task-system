import { TableProps } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { EquipmentRelocationHistoryItemDTO } from '../../api/dto'

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
