import { Flex, Layout, Typography } from 'antd'
import { FC, ReactElement } from 'react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import { isNotFoundError } from 'shared/api/baseApi'

const { Title } = Typography

const renderError = (message: string): ReactElement => {
  return (
    <Layout>
      <Layout.Content style={{ padding: 50 }}>
        <Flex vertical align='center' gap='middle'>
          <Title level={5}>{message}</Title>
          <Link to={CommonRouteEnum.Home}>Перейти на главную</Link>
        </Flex>
      </Layout.Content>
    </Layout>
  )
}

const ErrorBoundary: FC = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (isNotFoundError(error)) {
      return renderError('Страница не найдена')
    }
  }

  return renderError('Ошибка. Что-то пошло не так')
}

export default ErrorBoundary
