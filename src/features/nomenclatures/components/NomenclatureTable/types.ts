import { TableProps } from 'antd'
import { NomenclatureDTO } from 'features/warehouses/api/dto'

import { IdType } from 'shared/types/common'

export type NomenclatureTableItem = Pick<NomenclatureDTO, 'id' | 'title' | 'vendorCode'>

export type NomenclatureTableProps = Required<
  Pick<TableProps<NomenclatureTableItem>, 'dataSource' | 'loading' | 'pagination' | 'onChange'> & {
    onClickName: (id: IdType) => void
  }
>
