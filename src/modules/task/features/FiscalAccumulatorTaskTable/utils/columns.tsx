import { ColumnsType } from 'antd/es/table'

import { formatDate } from 'shared/utils/date'

import { FiscalAccumulatorTaskTableItem } from '../interfaces'

export const columns: ColumnsType<FiscalAccumulatorTaskTableItem> = [
  {
    key: 'blockingIn',
    dataIndex: 'blockingIn',
    title: 'Блокировка через',
    sorter: true,
  },
  {
    key: 'olaNextBreachTime',
    dataIndex: 'olaNextBreachTime',
    title: 'Крайний срок',
    sorter: true,
    render: (value: FiscalAccumulatorTaskTableItem['olaNextBreachTime']) =>
      formatDate(value),
  },
  {
    key: 'recordId',
    dataIndex: 'recordId',
    title: 'ИНЦ',
    sorter: true,
  },
  {
    key: 'sapId',
    dataIndex: 'sapId',
    title: 'SAP ID',
    sorter: true,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Клиент',
    sorter: true,
  },
  {
    key: 'address',
    dataIndex: 'address',
    title: 'Адрес',
    sorter: true,
  },
  {
    key: 'fiscalAccumulator',
    dataIndex: 'fiscalAccumulator',
    title: 'ФН',
    sorter: true,
    render: (value: FiscalAccumulatorTaskTableItem['fiscalAccumulator']) =>
      value.faNumber,
  },
  {
    key: 'deadlineOrTotalFiscalDocs',
    dataIndex: 'deadlineOrTotalFiscalDocs',
    title: 'Срок / Всего ФД',
    sorter: true,
  },
  {
    key: 'mr',
    dataIndex: 'supportGroup',
    title: 'МР',
    sorter: true,
    render: (value: FiscalAccumulatorTaskTableItem['supportGroup']) =>
      value.macroregion.title,
  },
  {
    key: 'supportGroup',
    dataIndex: 'supportGroup',
    title: 'Группа поддержки',
    sorter: true,
    render: (value: FiscalAccumulatorTaskTableItem['supportGroup']) =>
      value.name,
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Категория',
    sorter: true,
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Дата создания заявки',
    sorter: true,
    render: (value: FiscalAccumulatorTaskTableItem['createdAt']) =>
      formatDate(value),
  },
]
