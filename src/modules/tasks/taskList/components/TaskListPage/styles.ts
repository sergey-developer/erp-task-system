import { Col, Row } from 'antd'

import styled from 'styled-components'

export const ColFlexStyled = styled(Col)`
  display: flex;
  flex-direction: column;
`
export const RowStyled = styled.div`
  max-height: 100%;
  display: flex;
  flex: 1;
`

export const RowWrapStyled = styled(Row)`
  flex-direction: column;
  flex-flow: column;
  flex: 1;
`
