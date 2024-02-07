import { ColumnsType } from 'antd/es/table'

import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import { formatDate } from 'shared/utils/date'

import { EmployeesActionsReportTableItem } from './types'

export const columns: ColumnsType<EmployeesActionsReportTableItem> = [
  {
    dataIndex: 'equipment',
    title: 'Оборудование',
    render: (value: EmployeesActionsReportTableItem['equipment']) => value.title,
  },
  {
    dataIndex: 'equipment',
    title: 'Серийный №',
    render: (value: EmployeesActionsReportTableItem['equipment']) => value.serialNumber,
  },
  {
    dataIndex: 'equipment',
    title: 'Инвентарный №',
    render: (value: EmployeesActionsReportTableItem['equipment']) => value.inventoryNumber,
  },
  {
    dataIndex: 'relocationTask',
    title: 'Перемещение',
    render: (value: EmployeesActionsReportTableItem['relocationTask']) =>
      `№${value.id} от ${formatDate(value.createdAt)} (${relocationTaskStatusDict[value.status]})`,
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
