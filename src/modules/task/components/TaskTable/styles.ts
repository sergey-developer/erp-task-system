import { Typography } from 'antd'
import styled from 'styled-components'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

const { Text } = Typography

export const TableStyled: typeof ParentSizedTable = styled(ParentSizedTable)`
  .ant-table-cell {
    padding: 3px;
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

export const TableWrapperStyled = styled.div`
  height: 100%;
`

export const EmptyContentStyled = styled.div`
  padding: 20px 0;
`

export const OlaNextBreachTimeStyled = styled(Text)`
  white-space: nowrap;
`
