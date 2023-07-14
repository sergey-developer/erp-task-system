import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'

import { getWarehousePageLink } from 'modules/warehouse/utils'

import { WarehouseTableItem } from './interfaces'

export const columns: ColumnsType<WarehouseTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование объекта',
    sorter: true,
    render: (value, record) => (
      <Link to={`${getWarehousePageLink(record.id)}?name=${record.title}`}>
        {value}
      </Link>
    ),
  },
  {
    key: 'legalEntity',
    dataIndex: 'legalEntity',
    title: 'Юридическое лицо',
    sorter: true,
    render: (value) => value.title,
  },
  {
    key: 'address',
    dataIndex: 'address',
    title: 'Адрес',
    sorter: true,
  },
  {
    key: 'parent',
    dataIndex: 'parent',
    title: 'Родительский склад',
    sorter: true,
    render: (value) => value.title,
  },
]
