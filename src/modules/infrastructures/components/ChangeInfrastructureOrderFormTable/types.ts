import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { RowEditableConfig } from '@ant-design/pro-utils/es/useEditableArray'
import { Key } from 'react'

import { InfrastructureWorkModel } from 'modules/infrastructures/models'

import { InfrastructureWorkTypesCatalogModel } from 'shared/models/catalogs/infrastructureWorkTypes'
import { IdType } from 'shared/types/common'
import { Nullable, SetNonNullable } from 'shared/types/utils'

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
  'onChange'
> &
  SetNonNullable<EditableProTableProps<ChangeInfrastructureOrderFormTableRow, any>, 'name'> & {
    editableKeys?: Key[]

    managerIsCurrentUser: boolean
    infrastructureWorkTypes?: InfrastructureWorkTypesCatalogModel

    onChangeWorkType: (
      activeRow: ActiveChangeInfrastructureOrderFormTableRow,
      value: IdType,
    ) => Promise<void>
    infrastructureOrderFormWorkTypeCostIsFetching: boolean

    onChangeAmount: (
      record: ChangeInfrastructureOrderFormTableRow,
      value: Nullable<number>,
      activeRow: ActiveChangeInfrastructureOrderFormTableRow,
    ) => Promise<void>
  }
