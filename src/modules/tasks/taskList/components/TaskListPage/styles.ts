import { Col, Row } from 'antd'

import styled from 'styled-components'

export const ColFlexStyled = styled(Col)`
  display: flex;
  flex-direction: column;
`

export const RowStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`

export const RowWrapStyled = styled(Row)`
  flex-direction: column;
  flex-flow: column;
  flex: 1;
`
