import styled from 'styled-components'

export const WrapperStyled = styled.div`
  margin-top: -25px;
  margin-left: -25px;
  margin-right: -25px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.cosmicLatte};
  border-bottom: 1px solid ${({ theme }) => theme.colors.chineseWhite};
`
