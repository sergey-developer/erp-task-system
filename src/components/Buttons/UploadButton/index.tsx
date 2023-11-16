import { PaperClipOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'
import React, { FC } from 'react'

type UploadButtonProps = ButtonProps & {
  label: string
}

const UploadButton: FC<UploadButtonProps> = ({
  label,
  type = 'link',
  icon = <PaperClipOutlined />,
  ...props
}) => {
  return (
    <Button type={type} icon={icon} {...props}>
      {label}
    </Button>
  )
}

export default UploadButton
