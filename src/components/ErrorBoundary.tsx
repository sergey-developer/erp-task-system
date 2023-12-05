import { Layout, Typography } from 'antd'
import { FC } from 'react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import Space from './Space'

const { Title } = Typography

const renderError = (message: string) => {
  return (
    <Layout>
      <Layout.Content style={{ padding: 50 }}>
        <Space $block direction='vertical' align='center' size='middle'>
          <Title level={5}>{message}</Title>

          <Space size='middle'>
            <Link to={CommonRouteEnum.Home}>Перейти на главную</Link>
          </Space>
        </Space>
      </Layout.Content>
    </Layout>
  )
}

const ErrorBoundary: FC = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return renderError('Страница не найдена')
    }
  }

  return renderError('Ошибка. Что-то пошло не так')
}

export default ErrorBoundary
