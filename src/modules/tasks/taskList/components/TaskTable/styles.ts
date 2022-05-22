import { Table } from 'antd'

import styled from 'styled-components'

export const TableStyled: typeof Table = styled(Table)`
  && .ant-table-thead {
    .ant-table-cell {
      background-color: ${({ theme }) => theme.colors.defaultBackground};
      &:before {
        display: none;
      }
    }
  }
`
