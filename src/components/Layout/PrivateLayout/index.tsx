import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import Header from 'components/Header/PrivateHeader'
import Spinner from 'components/Spinner'

import { ContentStyled } from './styles'

const PrivateLayout: FC = () => {
  const breakpoints = useBreakpoint()

  return (
    <Layout>
      <Header />

      <ContentStyled $breakpoints={breakpoints}>
        <React.Suspense fallback={<Spinner area='parent' size='large' />}>
          <Outlet />
        </React.Suspense>
      </ContentStyled>
    </Layout>
  )
}

export default PrivateLayout
