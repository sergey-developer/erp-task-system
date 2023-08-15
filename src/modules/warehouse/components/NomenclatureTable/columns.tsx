import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { NomenclatureTableItem } from './types'

const { Link } = Typography

export const columns: ColumnsType<NomenclatureTableItem> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование',
    render: (value: NomenclatureTableItem['title']) => <Link>{value}</Link>,
  },
  {
    key: 'vendorCode',
    dataIndex: 'vendorCode',
    title: 'Артикул',
    render: (value: NomenclatureTableItem['vendorCode']) => value,
  },
]
