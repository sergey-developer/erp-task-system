import { Tag } from 'antd'

import styled from 'styled-components'

export const CheckableTagStyled = styled(Tag.CheckableTag)`
  && {
    height: 30px;
    display: inline-flex;
    border-radius: 100px;
    font-size: 14px;
    margin: 0;
  }

  &.ant-tag-checkable--disabled {
    cursor: not-allowed;
  }

  &&.ant-tag-checkable--disabled:hover {
    color: unset;
  }

  &.ant-tag-checkable--disabled:active {
    ${({ theme }) => `background-color: ${theme.colors.platinum};`}
  }

  &:not(.ant-tag-checkable-checked) {
    background-color: ${({ theme }) => theme.colors.platinum};
  }

  &.ant-tag-checkable-checked .ant-typography {
    color: ${({ theme }) => theme.colors.white};
  }
`
