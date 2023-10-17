import { Layout, Typography } from 'antd'
import React, { FC } from 'react'
import { Outlet, useMatch } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { useUserMeState } from 'modules/user/hooks'

import PrivateHeader from 'components/Headers/PrivateHeader'
import LoadingArea from 'components/LoadingArea'
import Spinner from 'components/Spinner'

import { useSystemInfoState } from 'shared/hooks/system'

import { ContentStyled, FooterStyled } from './styles'

const { Text } = Typography

const PrivateLayout: FC = () => {
  const changePasswordRouteMatched = useMatch(RouteEnum.ChangePassword)

  const { isFetching: userMeIsFetching } = useUserMeState()
  const { data: systemInfo } = useSystemInfoState()

  return (
    <Layout>
      <LoadingArea
        data-testid='private-layout-loading'
        isLoading={userMeIsFetching}
        area='parent'
        size='large'
      >
        <PrivateHeader />

        <ContentStyled $centered={!!changePasswordRouteMatched}>
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

export default PrivateLayout
