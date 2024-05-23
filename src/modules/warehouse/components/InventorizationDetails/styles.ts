import { CardProps } from 'antd'

import theme from 'styles/theme'

export const cardBodyStyles: CardProps['bodyStyle'] = {
  padding: '12px',
  backgroundColor: theme.colors.lotion,
  maxHeight: '250px',
  overflowY: 'auto',
}
