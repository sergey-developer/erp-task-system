import { ColumnsType } from 'antd/es/table'
import { getEquipmentListPageLink } from 'features/equipments/helpers'
import { Link } from 'react-router-dom'

import { EquipmentNomenclatureTableItem } from './types'

export const columns: ColumnsType<EquipmentNomenclatureTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование',
    render: (value: EquipmentNomenclatureTableItem['title'], record) => (
      <Link to={getEquipmentListPageLink({ id: record.id, title: record.title })}>{value}</Link>
    ),
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество оборудования',
  },
]
