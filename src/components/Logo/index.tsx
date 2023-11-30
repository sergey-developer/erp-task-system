import { FC } from 'react'
import { Link } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import { APP_NAME } from 'shared/constants/common'

import { LogoStyled } from './styles'

const Logo: FC = () => {
  return (
    <Link to={CommonRouteEnum.Root}>
      <LogoStyled>{APP_NAME}</LogoStyled>
    </Link>
  )
}

export default Logo
