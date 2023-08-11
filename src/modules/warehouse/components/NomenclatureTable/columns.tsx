import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { NomenclatureTableItem } from './types'

const { Link } = Typography

type GetColumnsArgs = { onClickName: (id: number) => void }

export const getColumns = ({
  onClickName,
}: GetColumnsArgs): ColumnsType<NomenclatureTableItem> => [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Наименование',
    render: (value: NomenclatureTableItem['title'], record) => (
      <Link onClick={() => onClickName(record.id)}>{value}</Link>
    ),
  },
  {
    key: 'vendorCode',
    dataIndex: 'vendorCode',
    title: 'Артикул',
    render: (value: NomenclatureTableItem['vendorCode']) => value,
  },
]
