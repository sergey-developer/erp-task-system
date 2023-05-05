import { Layout } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { useUserProfileState } from 'modules/user/hooks'

import Header from 'components/Header/PrivateHeader'
import LoadingArea from 'components/LoadingArea'
import Spinner from 'components/Spinner'

import { ContentStyled } from './styles'

const PrivateLayout: FC = () => {
  const breakpoints = useBreakpoint()
  const { isFetching: userProfileIsFetching } = useUserProfileState()

  return (
    <Layout>
      <LoadingArea
        data-testid='private-layout-loading'
        isLoading={userProfileIsFetching}
        area='parent'
        size='large'
      >
        <Header />

        <ContentStyled $breakpoints={breakpoints}>
          <React.Suspense fallback={<Spinner area='parent' size='large' />}>
            <Outlet />
          </React.Suspense>
        </ContentStyled>
      </LoadingArea>
    </Layout>
  )
}

export default PrivateLayout
