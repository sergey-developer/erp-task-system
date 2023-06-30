import { ColumnsType } from 'antd/es/table'

import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

import { FiscalDriverTableItem } from '../interfaces'

export const columns: ColumnsType<FiscalDriverTableItem> = [
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
    render: (value: FiscalDriverTableItem['olaNextBreachTime']) =>
      formatDate(value, DATE_TIME_FORMAT),
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
    render: (value: FiscalDriverTableItem['fiscalAccumulator']) =>
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
    render: (value: FiscalDriverTableItem['supportGroup']) =>
      value.macroregion.title,
  },
  {
    key: 'supportGroup',
    dataIndex: 'supportGroup',
    title: 'Группа поддержки',
    sorter: true,
    render: (value: FiscalDriverTableItem['supportGroup']) => value.name,
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
    render: (value: FiscalDriverTableItem['createdAt']) =>
      formatDate(value, DATE_TIME_FORMAT),
  },
]
