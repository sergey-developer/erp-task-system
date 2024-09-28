import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { RowEditableConfig } from '@ant-design/pro-utils/es/useEditableArray'

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
  'editableKeys' | 'onChange'
> &
  SetNonNullable<EditableProTableProps<ChangeInfrastructureOrderFormTableRow, any>, 'name'> & {
    managerIsCurrentUser: boolean
    infrastructureWorkTypes?: InfrastructureWorkTypesCatalogModel

    onChangeWorkType: (
      record: ChangeInfrastructureOrderFormTableRow,
      value: IdType,
    ) => Promise<void>

    onChangeAmount: (
      record: ChangeInfrastructureOrderFormTableRow,
      value: Nullable<number>,
    ) => Promise<void>
  }
