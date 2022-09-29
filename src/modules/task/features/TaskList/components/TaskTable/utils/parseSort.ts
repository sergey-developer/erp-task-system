import { SortOrder } from 'antd/es/table/interface'

import { SortValue, sortValueToSortableField } from '../constants/sort'

const parseSort = (
  value: SortValue,
): { order: SortOrder; columnKey: string } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? 'descend' : 'ascend',
    columnKey: sortValueToSortableField[parsedValue as SortValue],
  }
}

export default parseSort
