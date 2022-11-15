import { ParentSizedTable } from 'components/Tables/ParentSizedTable'
import styled from 'styled-components'

export const TableStyled: typeof ParentSizedTable = styled(ParentSizedTable)`
  .ant-table-cell {
    padding: 3px;
  }

  .ant-table-cell-row-hover {
    background: unset !important;
  }
`

export const TableWrapperStyled = styled.div`
  height: 100%;
`

export const EmptyContentStyled = styled.div`
  padding: 20px 0;
`
