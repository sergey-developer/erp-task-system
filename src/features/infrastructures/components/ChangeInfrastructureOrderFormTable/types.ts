import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { RowEditableConfig } from '@ant-design/pro-utils/es/useEditableArray'
import { InfrastructureWorkDTO } from 'features/infrastructures/api/dto'
import { Key } from 'react'

import { InfrastructureWorkTypesCatalogDTO } from 'shared/catalogs/infrastructureWorkTypes/api/dto'
import { IdType } from 'shared/types/common'
import { Nullable, SetNonNullable } from 'shared/types/utils'

export type ChangeInfrastructureOrderFormTableRow = Partial<
  Pick<InfrastructureWorkDTO, 'id' | 'type' | 'laborCosts' | 'amount' | 'cost' | 'price'>
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
    infrastructureWorkTypes?: InfrastructureWorkTypesCatalogDTO
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
