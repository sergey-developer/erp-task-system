import { Layout, Spin } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Header from 'components/Header/PrivateHeader'

import { ContentStyled } from './styles'

const PrivateLayout: FC = () => {
  return (
    <Layout>
      <Header />

      <ContentStyled>
        <React.Suspense fallback={<Spin size='large' />}>
          <Outlet />
        </React.Suspense>
      </ContentStyled>
    </Layout>
  )
}

export default PrivateLayout
