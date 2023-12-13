import { Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { fiscalAccumulatorFormatColorDict } from 'modules/fiscalAccumulator/constants'
import { getFullUserName } from 'modules/user/utils'

import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { BodyCellProps } from './components'
import { OlaNextBreachTimeStyled } from './styles'
import { FiscalAccumulatorTaskTableItem } from './types'

const { Paragraph } = Typography

export const columns: ColumnsType<FiscalAccumulatorTaskTableItem> = [
  {
    key: 'blockingIn',
    dataIndex: 'blockingIn',
    title: 'Блокировка через',
    onCell: (data): BodyCellProps => ({
      bgColor: data.faFormat ? fiscalAccumulatorFormatColorDict[data.faFormat] : undefined,
    }),
    render: (value: FiscalAccumulatorTaskTableItem['blockingIn']) => valueOrHyphen(value),
  },
  {
    key: 'olaNextBreachTime',
    dataIndex: 'olaNextBreachTime',
    width: 110,
    title: 'Крайний срок',
    render: (value: FiscalAccumulatorTaskTableItem['olaNextBreachTime'], record) => (
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
      valueOrHyphen(value?.faNumber),
  },
  {
    key: 'deadlineOrTotalFiscalDocs',
    dataIndex: 'deadlineOrTotalFiscalDocs',
    width: 100,
    title: 'Срок / Всего ФД',
    render: (value: FiscalAccumulatorTaskTableItem['deadlineOrTotalFiscalDocs']) =>
      valueOrHyphen(value),
  },
  {
    key: 'mr',
    dataIndex: 'supportGroup',
    title: 'МР',
    render: (value: FiscalAccumulatorTaskTableItem['supportGroup']) =>
      valueOrHyphen(value.macroregion?.title),
  },
  {
    key: 'supportGroup',
    dataIndex: 'supportGroup',
    title: 'Группа поддержки',
    render: (value: FiscalAccumulatorTaskTableItem['supportGroup']) => value.name,
  },
  {
    key: 'assignee',
    dataIndex: 'assignee',
    title: 'Исполнитель',
    render: (value: FiscalAccumulatorTaskTableItem['assignee']) => value && getFullUserName(value),
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
    render: (value: FiscalAccumulatorTaskTableItem['createdAt']) => formatDate(value),
  },
  {
    key: 'comment',
    dataIndex: 'comment',
    title: 'Комментарий',
    render: (value: FiscalAccumulatorTaskTableItem['comment']) =>
      value && (
        <Paragraph ellipsis={{ rows: 2 }} title={value.text}>
          {value.text}
        </Paragraph>
      ),
  },
]
