import { Table } from 'antd'

import styled from 'styled-components'

export const TableWrapper = styled.div`
  overflow-y: hidden;
`

export const TableStyled: typeof Table = styled(Table)`
  .ant-table-body[style] {
    overflow-y: auto !important;
  }
`
