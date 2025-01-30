import { ColumnsType } from 'antd/es/table'
import moment from 'moment-timezone'

import { MtsrReportTableItem } from './types'

export const columns: ColumnsType<MtsrReportTableItem> = [
  {
    dataIndex: 'title',
    title: 'Наименование',
    sorter: true,
    width: 800,
  },
  {
    dataIndex: 'averageExecutionTime',
    title: 'MTSR',
    sorter: true,
    render: (value) => parseFloat(moment.duration(value).asHours().toFixed(2)),
  },
  {
    dataIndex: 'returnedAmount',
    title: 'Возврат в работу',
    sorter: true,
  },
  {
    dataIndex: 'allTasks',
    title: 'Заявок всего',
    sorter: true,
  },
  {
    dataIndex: 'completedTasks',
    title: 'Решено заявок',
    sorter: true,
  },
  {
    dataIndex: 'overdueTasks',
    title: 'Просроченных заявок',
    sorter: true,
  },
]
