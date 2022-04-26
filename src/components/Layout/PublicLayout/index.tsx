import { Layout } from 'antd'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

import { ContentStyled } from './styles'

const PublicLayout: FCWithChildren = ({ children }) => {
  return (
    <Layout>
      <ContentStyled>{children}</ContentStyled>
    </Layout>
  )
}

export default PublicLayout
