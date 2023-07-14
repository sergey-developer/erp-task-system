import { FC } from 'react'
import { Link } from 'react-router-dom'

import { getWarehousePageLink } from 'modules/warehouse/utils'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { WarehouseTableItem, WarehouseTableProps } from './interfaces'

const WarehouseTable: FC<WarehouseTableProps> = (props) => {
  return (
    <div data-testid='warehouse-table'>
      <ParentSizedTable<WarehouseTableItem>
        {...props}
        rowKey='id'
        columns={[
          {
            key: 'title',
            dataIndex: 'title',
            title: 'Наименование объекта',
            sorter: true,
            render: (value, record) => (
              <Link to={getWarehousePageLink(record.id)}>{value}</Link>
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
        ]}
        pagination={false}
        showSorterTooltip={false}
      />
    </div>
  )
}

export default WarehouseTable
