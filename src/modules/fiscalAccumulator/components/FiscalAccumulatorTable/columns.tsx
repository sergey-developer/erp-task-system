import { ColumnsType } from 'antd/es/table'

import { fiscalAccumulatorFormatColorDict } from 'modules/fiscalAccumulator/constants'

import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { BodyCellProps } from './components'
import { OlaNextBreachTimeStyled } from './styles'
import { FiscalAccumulatorTableItem } from './types'

export const columns: ColumnsType<FiscalAccumulatorTableItem> = [
  {
    key: 'blockingIn',
    dataIndex: 'blockingIn',
    title: 'Блокировка через',
    onCell: (data): BodyCellProps => ({
      bgColor: data.faFormat ? fiscalAccumulatorFormatColorDict[data.faFormat] : undefined,
    }),
    render: (value: FiscalAccumulatorTableItem['blockingIn']) => valueOrHyphen(value),
  },
  {
    key: 'olaNextBreachTime',
    dataIndex: 'olaNextBreachTime',
    title: 'Крайний срок',
    render: (value: FiscalAccumulatorTableItem['olaNextBreachTime'], record) => (
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
    render: (value: FiscalAccumulatorTableItem['fiscalAccumulator']) =>
      valueOrHyphen(value?.faNumber),
  },
  {
    key: 'deadlineOrTotalFiscalDocs',
    dataIndex: 'deadlineOrTotalFiscalDocs',
    title: 'Срок / Всего ФД',
    render: (value: FiscalAccumulatorTableItem['deadlineOrTotalFiscalDocs']) =>
      valueOrHyphen(value),
  },
  {
    key: 'mr',
    dataIndex: 'supportGroup',
    title: 'МР',
    render: (value: FiscalAccumulatorTableItem['supportGroup']) =>
      valueOrHyphen(value.macroregion?.title),
  },
  {
    key: 'supportGroup',
    dataIndex: 'supportGroup',
    title: 'Группа поддержки',
    render: (value: FiscalAccumulatorTableItem['supportGroup']) => value.name,
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
    render: (value: FiscalAccumulatorTableItem['createdAt']) => formatDate(value),
  },
]
