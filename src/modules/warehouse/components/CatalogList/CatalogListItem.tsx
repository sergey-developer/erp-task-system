import { FC } from 'react'
import { Link } from 'react-router-dom'

import { CatalogItemWrapperStyled } from './styles'

type CatalogListItemProps = {
  link: string
  text: string
}

const CatalogListItem: FC<CatalogListItemProps> = ({ link, text }) => {
  return (
    <CatalogItemWrapperStyled>
      <Link to={link}>{text}</Link>
    </CatalogItemWrapperStyled>
  )
}

export default CatalogListItem
