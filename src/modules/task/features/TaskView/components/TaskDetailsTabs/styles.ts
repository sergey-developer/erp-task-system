import { Tabs } from 'antd'

import styled from 'styled-components'

import { taskDetailsContainerStretchCss } from '../TaskDetails/styles'

export const TabsStyled = styled(Tabs)`
  && {
    ${taskDetailsContainerStretchCss}
  }
`
