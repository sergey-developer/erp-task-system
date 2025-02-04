import { FC } from 'react'
import { Link } from 'react-router-dom'

import { CommonRoutesEnum } from 'configs/routes'

import { APP_NAME } from 'shared/constants/common'

import { LogoStyled } from './styles'

const Logo: FC = () => {
  return (
    <Link to={CommonRoutesEnum.Root}>
      <LogoStyled>{APP_NAME}</LogoStyled>
    </Link>
  )
}

export default Logo
