import { FC } from 'react'
import { Link } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'

import { LogoStyled } from './styles'

const Logo: FC = () => {
  return (
    <Link to={RoutesEnum.Root}>
      <LogoStyled>Obermeister-ITSM</LogoStyled>
    </Link>
  )
}

export default Logo
