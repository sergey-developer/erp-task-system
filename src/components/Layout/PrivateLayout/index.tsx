import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import Header from 'components/Header/PrivateHeader'
import LoadingArea from 'components/LoadingArea'
import Spinner from 'components/Spinner'
import { userApiEndpoints } from 'modules/user/services/userApi.service'

import { ContentStyled } from './styles'

const PrivateLayout: FC = () => {
  const breakpoints = useBreakpoint()

  const { isFetching: userProfileIsFetching } =
    userApiEndpoints.getUserProfile.useQueryState(undefined)

  return (
    <Layout>
      <LoadingArea
        isLoading={userProfileIsFetching}
        dimension='parent'
        size='large'
      >
        <Header />

        <ContentStyled $breakpoints={breakpoints}>
          <React.Suspense
            fallback={<Spinner dimension='parent' size='large' />}
          >
            <Outlet />
          </React.Suspense>
        </ContentStyled>
      </LoadingArea>
    </Layout>
  )
}

export default PrivateLayout
