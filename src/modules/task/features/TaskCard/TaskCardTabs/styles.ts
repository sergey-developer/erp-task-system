import { Tabs } from 'antd'

import styled from 'styled-components'

import { taskCardContainerStretchCss } from '../TaskCard/styles'

export const TabsStyled = styled(Tabs)`
  && {
    ${taskCardContainerStretchCss}
  }
`
