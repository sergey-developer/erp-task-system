import styled from 'styled-components'

export const CatalogItemWrapperStyled = styled.div`
  font-size: 20px;
  padding: 5px 10px;

  ${({ theme }) => `
    border-bottom: 1px solid ${theme.colors.chineseWhite};
    background-color: ${theme.colors.white};
  `}
`
