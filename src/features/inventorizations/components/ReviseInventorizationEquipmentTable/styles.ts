import { Flex } from 'antd'
import styled from 'styled-components'

export const TableWrapperStyled = styled(Flex)`
  & > .ant-form-item {
    min-width: 100%;
  }

  && .ant-select-selector {
    border-color: inherit;
  }

  .ant-input-disabled,
  .ant-input-disabled::placeholder,
  .ant-input-number-disabled {
    color: inherit;
  }
`
