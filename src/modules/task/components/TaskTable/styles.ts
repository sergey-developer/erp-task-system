import { Table } from 'antd'
import styled from 'styled-components'

export const TableStyled: typeof Table = styled(Table)`
  table {
    border-collapse: collapse;
  }
  
  .ant-table-cell-row-hover {
    background: unset !important;
  }

  .react-resizable {
    position: relative;
    background-clip: padding-box;
  }

  .react-resizable-handle {
    position: absolute;
    width: 10px;
    height: 100%;
    bottom: 0;
    right: -5px;
    cursor: col-resize;
    z-index: 1;
  }
`
