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
        }
      }

      .ant-table-pagination {
        flex: none;
        margin: 0;
        padding: 16px 10px;
        background-color: white;
        border-top: ${(props) => `1px solid ${props.theme.colors.lightGray}`};
      }
    }
  }
`
