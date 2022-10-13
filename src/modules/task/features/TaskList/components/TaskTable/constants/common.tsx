import { TableLocale } from 'antd/es/table/interface'

import { EmptyContentStyled } from '../styles'

export const localeConfig: TableLocale = {
  emptyText: (
    <EmptyContentStyled>
      По заданным параметрам фильтрации ни одна заявка не найдена
    </EmptyContentStyled>
  ),
}
