import styled from 'styled-components'

export const BadgeWrapperStyled = styled.div<{ isBadge: boolean }>`
  display: flex;
  align-items: ${({ isBadge }) => (isBadge ? 'baseline' : 'center')};
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
