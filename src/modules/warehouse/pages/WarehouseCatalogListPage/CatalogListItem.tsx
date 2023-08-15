import { FCWithChildren } from 'shared/types/utils'

import { CatalogItemWrapperStyled } from './styles'

const CatalogListItem: FCWithChildren = ({ children }) => {
  return <CatalogItemWrapperStyled>{children}</CatalogItemWrapperStyled>
}

export default CatalogListItem
