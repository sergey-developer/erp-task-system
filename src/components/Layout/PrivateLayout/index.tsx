import { Layout } from 'antd'
import React from 'react'

import PrivateHeader from 'components/Header/PrivateHeader'
import { FCWithChildren } from 'shared/interfaces/utils'

import { ContentStyled } from './styles'

const PrivateLayout: FCWithChildren = ({ children }) => {
  return (
    <Layout>
      <PrivateHeader />
      <ContentStyled>{children}</ContentStyled>
    </Layout>
  )
}

export default PrivateLayout
