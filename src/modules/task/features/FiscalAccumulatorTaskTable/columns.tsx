import { ColumnsType } from 'antd/es/table'

import { fiscalAccumulatorFormatColorDict } from 'modules/task/constants'

import { formatDate } from 'shared/utils/date'

import { BodyCellProps } from './components'
import { FiscalAccumulatorTaskTableItem } from './interfaces'
import { OlaNextBreachTimeStyled } from './styles'

export const columns: ColumnsType<FiscalAccumulatorTaskTableItem> = [
  {
    key: 'blockingIn',
    dataIndex: 'blockingIn',
    title: 'Блокировка через',
    onCell: (data): BodyCellProps => ({
      bgColor: data.faFormat
        ? fiscalAccumulatorFormatColorDict[data.faFormat]
        : undefined,
    }),
  },
  {
    key: 'olaNextBreachTime',
    dataIndex: 'olaNextBreachTime',
    title: 'Крайний срок',
    render: (
      value: FiscalAccumulatorTaskTableItem['olaNextBreachTime'],
      record,
    ) => (
      <OlaNextBreachTimeStyled $faFormat={record.faFormat}>
        {formatDate(value)}
      </OlaNextBreachTimeStyled>
    ),
  },
  {
    key: 'recordId',
    dataIndex: 'recordId',
    title: 'ИНЦ',
  },
  {
    key: 'sapId',
    dataIndex: 'sapId',
    title: 'SAP ID',
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Клиент',
  },
  {
    key: 'address',
    dataIndex: 'address',
    title: 'Адрес',
  },
  {
    key: 'fiscalAccumulator',
    dataIndex: 'fiscalAccumulator',
    title: 'ФН',
    render: (value: FiscalAccumulatorTaskTableItem['fiscalAccumulator']) =>
      value.faNumber,
  },
  {
    key: 'deadlineOrTotalFiscalDocs',
    dataIndex: 'deadlineOrTotalFiscalDocs',
    title: 'Срок / Всего ФД',
  },
  {
    key: 'mr',
    dataIndex: 'supportGroup',
    title: 'МР',
    render: (value: FiscalAccumulatorTaskTableItem['supportGroup']) =>
      value.macroregion.title,
  },
  {
    key: 'supportGroup',
    dataIndex: 'supportGroup',
    title: 'Группа поддержки',
    render: (value: FiscalAccumulatorTaskTableItem['supportGroup']) =>
      value.name,
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Категория',
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Дата создания заявки',
    render: (value: FiscalAccumulatorTaskTableItem['createdAt']) =>
      formatDate(value),
  },
]
