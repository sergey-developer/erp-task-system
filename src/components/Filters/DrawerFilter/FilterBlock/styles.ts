import styled from 'styled-components'

export const WrapperStyled = styled.div`
  padding: 30px;

  &:not(:last-child) {
    border-bottom: ${({ theme }) => theme.colors.chineseWhite};
  }
`
