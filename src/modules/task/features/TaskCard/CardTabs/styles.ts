import { Tabs } from 'antd'
import styled from 'styled-components'

import { taskCardContainerStretchCss } from '../Card/styles'

export const TabsStyled = styled(Tabs)`
  && {
    ${taskCardContainerStretchCss}
  }
`
