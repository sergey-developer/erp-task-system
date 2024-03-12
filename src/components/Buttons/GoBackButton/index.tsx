import { Button, ButtonProps } from 'antd'
import get from 'lodash/get'
import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type GoBackButtonProps = Pick<ButtonProps, 'type'> & {
  text?: string
}

const goBackValue = -1

const GoBackButton: FC<GoBackButtonProps> = ({ text = 'Назад', ...props }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const onClick = () => navigate(get(location, 'state.from', goBackValue))

  return (
    <Button {...props} onClick={onClick}>
      {text}
    </Button>
  )
}

export default GoBackButton
