import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { BaseLayoutContent } from 'components/Layouts/BaseLayoutContent'
import Spinner from 'components/Spinner'

const AuthLayout: FC = () => {
  return (
    <Layout>
      <BaseLayoutContent $centered>
        <React.Suspense fallback={<Spinner area='parent' size='large' />}>
          <Outlet />
        </React.Suspense>
      </BaseLayoutContent>
    </Layout>
  )
}

export default AuthLayout
