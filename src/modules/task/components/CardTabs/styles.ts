import { Tabs } from 'antd'
import styled from 'styled-components'

import { taskCardContainerStretchCss } from '../TaskCard/Card/styles'

export const TabsStyled: typeof Tabs = styled(Tabs)`
  && {
    ${taskCardContainerStretchCss}
  }
`
