import { Tag } from 'antd'

import styled from 'styled-components'

export const CheckableTagStyled = styled(Tag.CheckableTag)`
  height: 30px;
  display: inline-flex;
  border-radius: 100px;
  font-size: 14px;

  &:not(.ant-tag-checkable-checked) {
    background-color: ${({ theme }) => theme.colors.gray6};
  }

  &.ant-tag-checkable-checked .ant-typography {
    color: ${({ theme }) => theme.colors.white};
  }
`
