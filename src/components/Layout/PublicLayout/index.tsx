import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Spinner from 'components/Spinner'

import { ContentStyled } from './styles'

const PublicLayout: FC = () => {
  return (
    <Layout>
      <ContentStyled>
        <React.Suspense fallback={<Spinner dimension='parent' size='large' />}>
          <Outlet />
        </React.Suspense>
      </ContentStyled>
    </Layout>
  )
}

export default PublicLayout
