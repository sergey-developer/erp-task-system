import { Space, Typography } from 'antd'
import React, { FC } from 'react'

type ErrorListProps = {
  errors: Array<string>
}

const ErrorList: FC<ErrorListProps> = ({ errors }) => {
  if (!errors.length) return null

  return (
    <Space direction='vertical'>
      {errors.map((error, index) => (
        <Typography.Text data-testid='text-error' key={index} type='danger'>
          {error}
        </Typography.Text>
      ))}
    </Space>
  )
}

export default ErrorList
