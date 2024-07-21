import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'

import { getWarehousePageLink } from 'modules/warehouse/utils/warehouse'

import { valueOr } from 'shared/utils/common'

import { WarehouseTableItem } from './types'

export const columns: ColumnsType<WarehouseTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование объекта',
    sorter: true,
    render: (value: WarehouseTableItem['title'], record) => (
      <Link to={getWarehousePageLink(record.id, record.title)}>{value}</Link>
    ),
  },
  {
    key: 'legalEntity',
    dataIndex: 'legalEntity',
    title: 'Юридическое лицо',
    sorter: true,
    render: (value: WarehouseTableItem['legalEntity']) => value.title,
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
    render: (value: WarehouseTableItem['parent']) => valueOr(value?.title),
  },
]
