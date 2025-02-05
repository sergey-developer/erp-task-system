import { Layout, Typography } from 'antd'
import { useIsLoggedIn } from 'features/auth/hooks'
import { useGetUserMe } from 'features/user/hooks'
import { useGetUserMeCodeQuery } from 'features/user/services/userApi.service'
import moment from 'moment-timezone'
import React, { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import PrivateHeader from 'components/Headers/PrivateHeader'
import LoadingArea from 'components/LoadingArea'
import Spinner from 'components/Spinner'

import { useGetTimeZonesCatalog } from 'shared/catalogs/timeZones/hooks'
import { useGetUserStatusesCatalog } from 'shared/catalogs/userStatuses/hooks'
import { useGetSystemInfo, useGetSystemSettings } from 'shared/system/hooks'

import { ContentStyled, FooterStyled } from './styles'

const { Text } = Typography

const HomeLayout: FC = () => {
  const isLoggedIn = useIsLoggedIn()

  const { data: userMe, isFetching: userMeIsFetching } = useGetUserMe({ skip: !isLoggedIn })
  useGetTimeZonesCatalog({ skip: !isLoggedIn })
  useGetUserStatusesCatalog({ skip: !isLoggedIn })
  useGetUserMeCodeQuery(undefined, { skip: !isLoggedIn })
  useGetSystemSettings(undefined, { skip: !isLoggedIn })
  const { data: systemInfo } = useGetSystemInfo(undefined, { skip: !isLoggedIn })

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
