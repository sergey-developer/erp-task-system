import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { RowEditableConfig } from '@ant-design/pro-utils/es/useEditableArray'

import { InfrastructureWorkModel } from 'modules/infrastructures/models'

import { SetNonNullable } from 'shared/types/utils'

export type ChangeInfrastructureOrderFormTableRow = Partial<
  Pick<InfrastructureWorkModel, 'id' | 'type' | 'laborCosts' | 'amount' | 'cost' | 'price'>
> & {
  rowId: number
}

export type ActiveChangeInfrastructureOrderFormTableRow = {
  rowIndex: number
}

export type ChangeInfrastructureOrderFormTableProps = SetNonNullable<
  RowEditableConfig<ChangeInfrastructureOrderFormTableRow>,
  'editableKeys'
> &
  SetNonNullable<
    EditableProTableProps<ChangeInfrastructureOrderFormTableRow, any>,
    'loading' | 'name'
  > & {
    managerIsCurrentUser: boolean
  }
