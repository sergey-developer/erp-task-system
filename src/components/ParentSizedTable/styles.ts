import { Table } from 'antd'

import styled from 'styled-components'

export const StyledTable: typeof Table = styled(Table)`
  height: 100%;

  .ant-spin-nested-loading {
    height: 100%;

    .ant-spin-container {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;

      .ant-table {
        background-color: ${({ theme }) => theme.colors.lightGray};
        flex: auto;
        overflow: hidden;

        .ant-table-container {
          height: 100%;
          display: flex;
          flex-flow: column nowrap;

          .ant-table-header {
            flex: none;
          }

          .ant-table-body {
            flex: auto;
            overflow: auto;
          }
          .ant-table-tbody {
            background-color: ${({ theme }) => theme.colors.white};
          }
          &:after,
          &:before {
            box-shadow: none;
          }
        }
      }

      .ant-table-pagination {
        flex: none;
        margin: 0;
        padding: 16px 10px;
        border-top: ${(props) => `1px solid ${props.theme.colors.lightGray}`};
      }
    }
  }
  && .ant-table-thead {
    .ant-table-cell {
      background-color: ${({ theme }) => theme.colors.lightGray};
      &:before {
        display: none;
      }
    }
  }
`
