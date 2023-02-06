import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import Header from 'components/Header/PrivateHeader'
import LoadingArea from 'components/LoadingArea'
import Spinner from 'components/Spinner'
import { useUserProfileState } from 'modules/user/hooks'

import { ContentStyled } from './styles'

const PrivateLayout: FC = () => {
  const breakpoints = useBreakpoint()
  const { isFetching: userProfileIsFetching } = useUserProfileState()

  return (
    <Layout>
      <LoadingArea isLoading={userProfileIsFetching} area='parent' size='large'>
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
