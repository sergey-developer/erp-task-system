import { Button, Popconfirm } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { DeleteIcon } from 'components/Icons'

import { TaskCallingReasonsTableItem, TaskCallingReasonsTableProps } from './types'

export const getColumns = ({
  onDelete,
  disabled,
}: Pick<
  TaskCallingReasonsTableProps,
  'onDelete' | 'disabled'
>): ColumnsType<TaskCallingReasonsTableItem> => [
  {
    dataIndex: 'title',
    title: '№ заявки/причина вызова',
  },
  {
    dataIndex: 'equipmentType',
    title: 'Тип/марка оборудования',
  },
  {
    dataIndex: 'malfunction',
    title: 'Причина неисправности',
  },
  {
    dataIndex: 'inventoryNumber',
    title: 'Инвентарный номер',
  },
  {
    key: 'delete',
    width: 60,
    render: (_, record) => (
      <Popconfirm
        title='Вы действительно хотите удалить причину вызова?'
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
