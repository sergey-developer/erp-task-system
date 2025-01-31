import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { RowEditableConfig } from '@ant-design/pro-utils/es/useEditableArray'
import { InfrastructureWorkModel } from 'features/infrastructures/models'
import { Key } from 'react'

import { InfrastructureWorkTypesCatalogModel } from 'shared/catalogs/api/dto/infrastructureWorkTypes'
import { IdType } from 'shared/types/common'
import { Nullable, SetNonNullable } from 'shared/types/utils'

export type ChangeInfrastructureOrderFormTableRow = Partial<
  Pick<InfrastructureWorkModel, 'id' | 'type' | 'laborCosts' | 'amount' | 'cost' | 'price'>
> & {
  rowId: number
  isNew: boolean
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
    createWorkIsLoading: boolean
    updateWorkIsLoading: boolean

    onChangeWorkType: (
      record: ChangeInfrastructureOrderFormTableRow,
      value: IdType,
      activeRow: ActiveChangeInfrastructureOrderFormTableRow,
    ) => Promise<void>
    infrastructureOrderFormWorkTypeCostIsFetching: boolean

    onChangeAmount: (
      record: ChangeInfrastructureOrderFormTableRow,
      value: Nullable<number>,
      activeRow: ActiveChangeInfrastructureOrderFormTableRow,
    ) => Promise<void>

    onClickDeleteInfrastructureWorkType: (
      activeRow: ActiveChangeInfrastructureOrderFormTableRow,
    ) => void
  }
