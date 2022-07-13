import { CopyOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'
import React, { FC } from 'react'

import useClipboard from 'shared/hooks/useClipboard'

type CopyButtonProps = ButtonProps & {
  value: string
}

const CopyButton: FC<CopyButtonProps> = ({ value, onClick, ...props }) => {
  const clipboard = useClipboard()

  const handleClick: ButtonProps['onClick'] = async (event) => {
    await clipboard.copy(value)
    onClick && onClick(event)
  }

  return (
    <Button
      icon={clipboard.copied ? null : <CopyOutlined />}
      onClick={handleClick}
      {...props}
    >
      {clipboard.copied ? 'Скопировано!' : 'Копировать'}
    </Button>
  )
}

export default CopyButton
