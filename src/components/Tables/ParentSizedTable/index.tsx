import { TableProps } from 'antd'
import { ReactElement } from 'react'

import { TableStyled } from './styles'

/**
 * ParentSizedTable является полной копией компонента antd Table с измененными стилями
 * Из коробки AntD таблица не умеет подстраиваться под высоту родителя
 * Данный компонент решает вышеуказанную проблему
 * Больше информации: https://github.com/ant-design/ant-design/issues/23974
 */

export function ParentSizedTable<RecordType extends Record<string, any>>(
  props: Omit<TableProps<RecordType>, 'scroll'>,
): ReactElement {
  return (
    <TableStyled<RecordType> {...props} scroll={{ x: '100%', y: '100%' }} />
  )
}
