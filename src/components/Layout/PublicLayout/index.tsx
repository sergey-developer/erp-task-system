import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Spin from 'components/Spin'

import { ContentStyled } from './styles'

const PublicLayout: FC = () => {
  return (
    <Layout>
      <ContentStyled>
        <React.Suspense fallback={<Spin />}>
          <Outlet />
        </React.Suspense>
      </ContentStyled>
    </Layout>
  )
}

export default PublicLayout
