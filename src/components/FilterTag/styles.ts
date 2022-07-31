import { Tag } from 'antd'

import styled from 'styled-components'

type CheckableTagStyledProps = {
  $disabled?: boolean
}

export const CheckableTagStyled = styled(
  Tag.CheckableTag,
)<CheckableTagStyledProps>`
  && {
    height: 30px;
    display: inline-flex;
    border-radius: 100px;
    font-size: 14px;
    margin: 0;
  }

  &.ant-tag-checkable:not(.ant-tag-checkable-checked):hover {
    ${({ $disabled }) => ($disabled ? `color: unset;` : '')}
  }

  &.ant-tag-checkable:active {
    ${({ theme, $disabled }) =>
      $disabled ? `background-color: ${theme.colors.gray6};` : ''}
  }

  &:not(.ant-tag-checkable-checked) {
    background-color: ${({ theme }) => theme.colors.gray6};
    ${({ $disabled }) => ($disabled ? 'cursor: not-allowed;' : '')};
  }

  &.ant-tag-checkable-checked .ant-typography {
    color: ${({ theme }) => theme.colors.white};
  }
`
