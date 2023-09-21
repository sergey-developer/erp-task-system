import { DrawerProps } from 'antd'

import { RelocationEquipmentListModel, RelocationTaskModel } from 'modules/warehouse/models'

import { RelocationEquipmentTableProps } from '../RelocationEquipmentTable/types'

export type RelocationTaskDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'visible'>> & {
  relocationTask?: Pick<
    RelocationTaskModel,
    | 'id'
    | 'deadlineAt'
    | 'status'
    | 'createdAt'
    | 'relocateFrom'
    | 'relocateTo'
    | 'executor'
    | 'createdBy'
    | 'comment'
    | 'documents'
  >
  relocationTaskIsLoading: boolean

  relocationEquipmentList: RelocationEquipmentListModel
  relocationEquipmentListIsLoading: boolean
  onChangeEquipmentTable: RelocationEquipmentTableProps['onChange']
}
