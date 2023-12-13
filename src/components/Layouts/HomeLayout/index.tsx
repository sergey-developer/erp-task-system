import { Layout, Typography } from 'antd'
import moment from 'moment-timezone'
import React, { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useIsLoggedIn } from 'modules/auth/hooks'
import { useGetUserMe } from 'modules/user/hooks'
import { useGetUserMeCodeQuery } from 'modules/user/services/userApi.service'

import PrivateHeader from 'components/Headers/PrivateHeader'
import LoadingArea from 'components/LoadingArea'
import Spinner from 'components/Spinner'

import { useGetTimeZoneList } from 'shared/hooks/catalogs/timeZone'
import { useGetUserStatusList } from 'shared/hooks/catalogs/userStatus'
import { useGetSystemInfoQuery } from 'shared/services/systemApi.service'

import { ContentStyled, FooterStyled } from './styles'

const { Text } = Typography

const HomeLayout: FC = () => {
  const isLoggedIn = useIsLoggedIn()

  const { data: userMe, isFetching: userMeIsFetching } = useGetUserMe({ skip: !isLoggedIn })
  useGetTimeZoneList({ skip: !isLoggedIn })
  useGetUserStatusList({ skip: !isLoggedIn })
  useGetUserMeCodeQuery(undefined, { skip: !isLoggedIn })
  const { data: systemInfo } = useGetSystemInfoQuery(undefined, { skip: !isLoggedIn })

  useEffect(() => {
    if (userMe?.timezone) {
      moment.tz.setDefault(userMe.timezone)
    }
  }, [userMe?.timezone])

  return (
    <Layout>
      <LoadingArea
        data-testid='home-layout-loading'
        isLoading={userMeIsFetching}
        area='global'
        size='large'
      >
        <PrivateHeader />

        <ContentStyled>
          <React.Suspense fallback={<Spinner area='parent' size='large' />}>
            <Outlet />
          </React.Suspense>
        </ContentStyled>

        {systemInfo && (
          <FooterStyled>
            <Text type='secondary'>
              R{systemInfo.releaseVersion}. {systemInfo.releasedAt}
            </Text>
          </FooterStyled>
        )}
      </LoadingArea>
    </Layout>
  )
}

export default HomeLayout
