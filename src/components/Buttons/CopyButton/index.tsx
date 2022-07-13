import { CopyOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'
import React, { FC } from 'react'
import { useClipboard } from 'use-clipboard-copy'

const NOT_SUPPORTED_TEXT: string = 'Ваш браузер не поддерживает копирование'
const COPIED_TIMEOUT: number = 2000

type CopyButtonProps = ButtonProps & {
  value: string
}

const CopyButton: FC<CopyButtonProps> = ({ value, onClick, ...props }) => {
  const clipboard = useClipboard({ copiedTimeout: COPIED_TIMEOUT })

  const handleClick: ButtonProps['onClick'] = (event) => {
    clipboard.copy(value)
    onClick && onClick(event)
  }

  return (
    <Button
      icon={clipboard.copied ? null : <CopyOutlined />}
      onClick={handleClick}
      {...props}
    >
      {clipboard.isSupported()
        ? clipboard.copied
          ? 'Скопировано!'
          : 'Копировать'
        : NOT_SUPPORTED_TEXT}
    </Button>
  )
}

export default CopyButton
