import { Layout, Typography } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import React, { FC } from 'react'
import { Outlet, useMatch } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { useUserMeState } from 'modules/user/hooks'

import Breadcrumbs from 'components/Breadcrumbs'
import PrivateHeader from 'components/Header/PrivateHeader'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { useSystemInfoState } from 'shared/services/api/hooks'

import { ContentStyled, FooterStyled } from './styles'

const { Text } = Typography

const PrivateLayout: FC = () => {
  const breakpoints = useBreakpoint()
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

        <ContentStyled
          $breakpoints={breakpoints}
          $centered={!!changePasswordRouteMatched}
        >
          <Space $block direction='vertical' size='large'>
            <Breadcrumbs />

            <React.Suspense fallback={<Spinner area='parent' size='large' />}>
              <Outlet />
            </React.Suspense>
          </Space>
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
