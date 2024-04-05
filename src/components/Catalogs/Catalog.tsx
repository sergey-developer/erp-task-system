import { FC } from 'react'
import { Link } from 'react-router-dom'

import { CatalogWrapperStyled } from './styles'

export type CatalogProps = {
  link: string
  text: string
}

const Catalog: FC<CatalogProps> = ({ link, text }) => {
  return (
    <CatalogWrapperStyled>
      <Link to={link}>{text}</Link>
    </CatalogWrapperStyled>
  )
}

export default Catalog
