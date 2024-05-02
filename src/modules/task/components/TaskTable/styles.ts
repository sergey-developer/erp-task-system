import styled from 'styled-components'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

export const TableStyled: typeof ParentSizedTable = styled(ParentSizedTable)`
  table {
    border-collapse: collapse;
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
