import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { relocationTaskStatusDict } from 'features/warehouse/constants/relocationTask'

import { valueOr } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { EmployeesActionsReportTableItem, EmployeesActionsReportTableProps } from './types'

const { Link } = Typography

export const getColumns = ({
  onClickEquipment,
  onClickRelocationTask,
}: Pick<
  EmployeesActionsReportTableProps,
  'onClickEquipment' | 'onClickRelocationTask'
>): ColumnsType<EmployeesActionsReportTableItem> => [
  {
    dataIndex: 'equipment',
    title: 'Оборудование',
    render: (value: EmployeesActionsReportTableItem['equipment']) => (
      <Link onClick={() => onClickEquipment(value.id)}>{value.title}</Link>
    ),
  },
  {
    dataIndex: 'equipment',
    title: 'Серийный №',
    render: (value: EmployeesActionsReportTableItem['equipment']) => valueOr(value.serialNumber),
  },
  {
    dataIndex: 'equipment',
    title: 'Инвентарный №',
    render: (value: EmployeesActionsReportTableItem['equipment']) => valueOr(value.inventoryNumber),
  },
  {
    dataIndex: 'relocationTask',
    title: 'Перемещение',
    render: (value: EmployeesActionsReportTableItem['relocationTask']) => (
      <Link onClick={() => onClickRelocationTask(value.id)}>
        №{value.id} от {formatDate(value.createdAt)} ({relocationTaskStatusDict[value.status]})
      </Link>
    ),
  },
  {
    dataIndex: 'roles',
    title: 'Роль',
    render: (value: EmployeesActionsReportTableItem['roles']) => value.join(', '),
  },
  {
    dataIndex: 'relocationTask',
    title: 'Объект выбытия',
    render: (value: EmployeesActionsReportTableItem['relocationTask']) => value.relocateFrom?.title,
  },
  {
    dataIndex: 'relocationTask',
    title: 'Объект прибытия',
    render: (value: EmployeesActionsReportTableItem['relocationTask']) => value.relocateTo?.title,
  },
  {
    dataIndex: 'quantity',
    title: 'Количество',
  },
]
