import { Layout } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Header from 'components/Header/PrivateHeader'
import Spin from 'components/Spin'

import { ContentStyled } from './styles'

const PrivateLayout: FC = () => {
  const breakpoints = useBreakpoint()

  return (
    <Layout>
      <Header />

      <ContentStyled $breakpoints={breakpoints}>
        <React.Suspense fallback={<Spin />}>
          <Outlet />
        </React.Suspense>
      </ContentStyled>
    </Layout>
  )
}

export default PrivateLayout
