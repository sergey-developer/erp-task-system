import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Spinner from 'components/Spinner'

import { BaseLayoutContent } from '../BaseLayoutContent'

const PublicLayout: FC = () => {
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

export default PublicLayout
