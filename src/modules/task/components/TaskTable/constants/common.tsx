import { TableProps } from 'antd'
import { TableLocale } from 'antd/es/table/interface'

import { TaskTableListItem } from '../types'

export const localeConfig: Pick<TableLocale, 'emptyText'> = {
  emptyText: 'По заданным параметрам фильтрации ни одна заявка не найдена',
}

export const scrollConfig: TableProps<TaskTableListItem>['scroll'] = { y: 600 }
