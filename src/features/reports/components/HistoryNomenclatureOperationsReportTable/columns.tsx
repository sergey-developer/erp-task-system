import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { equipmentConditionDict } from 'features/warehouse/constants/equipment'
import { relocationTaskStatusDict } from 'features/warehouse/constants/relocationTask'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { getYesNoWord, valueOr } from 'shared/utils/common'
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
    dataIndex: 'title',
    title: 'Оборудование',
    render: (value: HistoryNomenclatureOperationsReportTableItem['title'], record) => (
      <Link onClick={() => onClickEquipment(record.id)}>{value}</Link>
    ),
  },
  {
    dataIndex: 'serialNumber',
    title: 'Серийный №',
    render: (value: HistoryNomenclatureOperationsReportTableItem['serialNumber']) => valueOr(value),
  },
  {
    dataIndex: 'inventoryNumber',
    title: 'Инвентарный №',
    render: (value: HistoryNomenclatureOperationsReportTableItem['inventoryNumber']) =>
      valueOr(value),
  },
  {
    dataIndex: 'condition',
    title: 'Состояние',
    render: (value: HistoryNomenclatureOperationsReportTableItem['condition']) =>
      equipmentConditionDict[value],
  },
  {
    dataIndex: 'isNew',
    title: 'Новое',
    render: (value: HistoryNomenclatureOperationsReportTableItem['isNew']) => getYesNoWord(value),
  },
  {
    dataIndex: 'isWarranty',
    title: 'На гарантии',
    render: (value: HistoryNomenclatureOperationsReportTableItem['isWarranty']) =>
      getYesNoWord(value),
  },
  {
    dataIndex: 'isRepaired',
    title: 'Отремонтированное',
    render: (value: HistoryNomenclatureOperationsReportTableItem['isRepaired']) =>
      getYesNoWord(value),
  },
  {
    dataIndex: 'creditedAt',
    title: 'Дата оприходования',
    render: (value: HistoryNomenclatureOperationsReportTableItem['creditedAt']) =>
      formatDate(value, DATE_FORMAT),
  },
  {
    dataIndex: 'lastRelocationTask',
    title: 'Последнее перемещение',
    render: (value: HistoryNomenclatureOperationsReportTableItem['lastRelocationTask']) => (
      <Link onClick={() => onClickRelocationTask(value.id)}>
        №{value.id} от {formatDate(value.createdAt)} ({relocationTaskStatusDict[value.status]})
      </Link>
    ),
  },
  {
    dataIndex: 'location',
    title: 'Фактическое местонахождение',
    render: (value: HistoryNomenclatureOperationsReportTableItem['location']) => value?.title,
  },
]
