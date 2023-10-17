import { TableProps } from 'antd'

import { NomenclatureListItemModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type NomenclatureTableItem = Pick<NomenclatureListItemModel, 'id' | 'title' | 'vendorCode'>

export type NomenclatureTableProps = Required<
  Pick<TableProps<NomenclatureTableItem>, 'dataSource' | 'loading' | 'pagination' | 'onChange'> & {
    onClickName: (id: IdType) => void
  }
>
