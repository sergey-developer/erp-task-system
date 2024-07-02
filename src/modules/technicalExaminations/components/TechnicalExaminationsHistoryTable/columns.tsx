import { ColumnsType } from 'antd/es/table'

import { getFullUserName } from 'modules/user/utils'

import { getYesNoWord } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { TechnicalExaminationsHistoryTableItem } from './types'

export const columns: ColumnsType<TechnicalExaminationsHistoryTableItem> = [
  {
    dataIndex: 'createdBy',
    title: 'Исполнитель',
    render: (value: TechnicalExaminationsHistoryTableItem['createdBy']) =>
      value ? getFullUserName(value) : null,
  },
  {
    dataIndex: 'createdAt',
    title: 'Сформировано',
    render: (value: TechnicalExaminationsHistoryTableItem['createdAt']) => formatDate(value),
  },
  {
    dataIndex: 'malfunction',
    title: 'Причина неисправности',
    ellipsis: true,
  },
  {
    dataIndex: 'hasMechanicalDamage',
    title: 'Имеются следы мех. повреждения',
    render: (value: TechnicalExaminationsHistoryTableItem['hasMechanicalDamage']) =>
      getYesNoWord(value),
  },
  {
    dataIndex: 'restorationAction',
    title: 'Для устранения неисправности необходимо',
    ellipsis: true,
  },
  {
    dataIndex: 'restorationCost',
    title: 'Стоимость восстановления',
  },
  {
    dataIndex: 'conclusion',
    title: 'Заключение комиссии',
  },
]
