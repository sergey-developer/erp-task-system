import { Button, Popconfirm } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { DeleteIcon } from 'components/Icons'

import { CompletedWorkTableItem, CompletedWorkTableProps } from './types'

export const getColumns = ({
  onDelete,
  disabled,
}: Pick<CompletedWorkTableProps, 'onDelete' | 'disabled'>): ColumnsType<CompletedWorkTableItem> => [
  {
    dataIndex: 'title',
    title: 'Наименование работ',
  },
  {
    dataIndex: 'measurementUnit',
    title: 'Ед. измерения',
    render: (value: CompletedWorkTableItem['measurementUnit']) => value.title,
  },
  {
    dataIndex: 'quantity',
    title: 'Количество',
  },
  {
    key: 'delete',
    width: 60,
    render: (_, record) => (
      <Popconfirm
        title='Вы действительно хотите удалить работы?'
        onConfirm={() => onDelete(record.id)}
      >
        <Button
          type='text'
          icon={<DeleteIcon $cursor='pointer' $color='fireOpal' />}
          disabled={disabled}
        />
      </Popconfirm>
    ),
  },
]
