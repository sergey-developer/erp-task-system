import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'

import { getEquipmentListPageLink } from 'modules/warehouse/utils'

import { EquipmentNomenclatureTableItem } from './types'

export const columns: ColumnsType<EquipmentNomenclatureTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование',
    render: (value: EquipmentNomenclatureTableItem['title'], record) => (
      <Link to={`${getEquipmentListPageLink(record.id)}?title=${record.title}`}>
        {value}
      </Link>
    ),
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество оборудования',
    render: (value: EquipmentNomenclatureTableItem['quantity']) => value,
  },
]
