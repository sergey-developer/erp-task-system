import styled from 'styled-components'

export const WrapBadgeStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  & > :first-child {
    width: 16px;
    display: flex;
    justify-content: center;
    & > .ant-badge-status-text {
      display: none;
    }
  }
`
