import { Layout } from 'antd'
import styled from 'styled-components'

export type BaseLayoutContentProps = { $centered?: boolean }

export const BaseLayoutContent = styled(Layout.Content)<BaseLayoutContentProps>`
  display: flex;
  flex-direction: column;

  ${({ $centered }) =>
    $centered
      ? `
    justify-content: center;
    align-items: center;
  `
      : ''}
`
