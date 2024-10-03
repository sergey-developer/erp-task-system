import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { RowEditableConfig } from '@ant-design/pro-utils/es/useEditableArray'
import { Key } from 'react'

import { InfrastructureWorkModel } from 'modules/infrastructures/models'

import { InfrastructureWorkTypesCatalogModel } from 'shared/models/catalogs/infrastructureWorkTypes'
import { SetNonNullable } from 'shared/types/utils'

export type ChangeInfrastructureOrderFormTableRow = Partial<
  Pick<InfrastructureWorkModel, 'id' | 'type' | 'laborCosts' | 'amount' | 'cost' | 'price'>
> & {
  rowId: number
}

export type ActiveChangeInfrastructureOrderFormTableRow = Pick<
  ChangeInfrastructureOrderFormTableRow,
  'id'
> & {
  rowIndex: number
}

export type ChangeInfrastructureOrderFormTableProps = SetNonNullable<
  RowEditableConfig<ChangeInfrastructureOrderFormTableRow>,
  'onChange'
> &
  SetNonNullable<EditableProTableProps<ChangeInfrastructureOrderFormTableRow, any>, 'name'> & {
    editableKeys?: Key[]

    managerIsCurrentUser: boolean
    infrastructureWorkTypes?: InfrastructureWorkTypesCatalogModel
    onClickDeleteInfrastructureWorkType: (
      activeRow: ActiveChangeInfrastructureOrderFormTableRow,
    ) => void
  }
