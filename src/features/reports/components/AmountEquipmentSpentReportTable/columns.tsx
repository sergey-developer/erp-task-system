import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { relocationTaskStatusDict } from 'features/relocationTasks/constants'

import { formatDate } from 'shared/utils/date'

import { AmountEquipmentSpentReportTableItem, AmountEquipmentSpentReportTableProps } from './types'

const { Link } = Typography

export const getColumns = ({
  onClickEquipment,
  onClickRelocationTask,
}: Pick<
  AmountEquipmentSpentReportTableProps,
  'onClickEquipment' | 'onClickRelocationTask'
>): ColumnsType<AmountEquipmentSpentReportTableItem> => [
  {
    dataIndex: 'equipment',
    title: 'Оборудование',
    render: (value: AmountEquipmentSpentReportTableItem['equipment']) => (
      <Link onClick={() => onClickEquipment(value.id)}>{value.title}</Link>
    ),
  },
  {
    dataIndex: 'quantity',
    title: 'Количество',
  },
  {
    dataIndex: 'relocationTask',
    title: 'Перемещение',
    render: (value: AmountEquipmentSpentReportTableItem['relocationTask']) => (
      <Link onClick={() => onClickRelocationTask(value.id)}>
        №{value.id} от {formatDate(value.createdAt)} ({relocationTaskStatusDict[value.status]})
      </Link>
    ),
  },
  {
    dataIndex: 'relocationTask',
    title: 'Объект выбытия',
    render: (value: AmountEquipmentSpentReportTableItem['relocationTask']) =>
      value.relocateFrom?.title,
  },
  {
    dataIndex: 'relocationTask',
    title: 'Объект прибытия',
    render: (value: AmountEquipmentSpentReportTableItem['relocationTask']) =>
      value.relocateTo?.title,
  },
]
