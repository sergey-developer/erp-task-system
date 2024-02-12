import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import { formatDate } from 'shared/utils/date'

import {
  HistoryNomenclatureOperationsReportTableItem,
  HistoryNomenclatureOperationsReportTableProps,
} from './types'

const { Link } = Typography

export const getColumns = ({
  onClickEquipment,
  onClickRelocationTask,
}: Pick<
  HistoryNomenclatureOperationsReportTableProps,
  'onClickEquipment' | 'onClickRelocationTask'
>): ColumnsType<HistoryNomenclatureOperationsReportTableItem> => [
  {
    dataIndex: 'equipment',
    title: 'Оборудование',
    render: (value: HistoryNomenclatureOperationsReportTableItem['equipment']) => (
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
    render: (value: HistoryNomenclatureOperationsReportTableItem['relocationTask']) => (
      <Link onClick={() => onClickRelocationTask(value.id)}>
        №{value.id} от {formatDate(value.createdAt)} ({relocationTaskStatusDict[value.status]})
      </Link>
    ),
  },
  {
    dataIndex: 'relocationTask',
    title: 'Объект выбытия',
    render: (value: HistoryNomenclatureOperationsReportTableItem['relocationTask']) =>
      value.relocateFrom?.title,
  },
  {
    dataIndex: 'relocationTask',
    title: 'Объект прибытия',
    render: (value: HistoryNomenclatureOperationsReportTableItem['relocationTask']) =>
      value.relocateTo?.title,
  },
]
