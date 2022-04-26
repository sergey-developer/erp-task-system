import { Layout } from 'antd'
import React from 'react'

import Header from 'components/Header/PrivateHeader'
import { FCWithChildren } from 'shared/interfaces/utils'

import { ContentStyled } from './styles'

const PrivateLayout: FCWithChildren = ({ children }) => {
  return (
    <Layout>
      <Header />
      <ContentStyled>{children}</ContentStyled>
    </Layout>
  )
}

export default PrivateLayout
