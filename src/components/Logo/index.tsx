import { FC } from 'react'
import { Link } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'
import { APP_NAME } from 'shared/constants/common'

import { LogoStyled } from './styles'

const Logo: FC = () => {
  return (
    <Link to={RoutesEnum.Root}>
      <LogoStyled>{APP_NAME}</LogoStyled>
    </Link>
  )
}

export default Logo
