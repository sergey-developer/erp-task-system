import { Table } from 'antd'

import styled from 'styled-components'

export const TableStyled: typeof Table = styled(Table)`
  .ant-table-body[style] {
    overflow-y: auto !important;
  }
`
