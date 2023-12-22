import { Tabs } from 'antd'
import styled from 'styled-components'

export const TabsStyled: typeof Tabs = styled(Tabs)`
  margin-left: -25px;
  margin-right: -25px;

  & .ant-tabs-content {
    padding: 20px;
  }
`
