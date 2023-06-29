import styled from 'styled-components'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

export const TableStyled: typeof ParentSizedTable = styled(ParentSizedTable)`
  .ant-table-cell {
    padding: 3px;
  }
`

export const TableWrapperStyled = styled.div`
  height: 100%;
`
