import { Tabs } from 'antd'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

import { DetailContainerStyled } from '../styles'
import { TaskDetailsTabsEnum } from './constants'

export type TabsSectionProps = {
  defaultTabKey: TaskDetailsTabsEnum
}

const TabsSection: FCWithChildren<TabsSectionProps> = ({
  defaultTabKey,
  children,
}) => {
  return (
    <DetailContainerStyled>
      <Tabs defaultActiveKey={defaultTabKey}>{children}</Tabs>
    </DetailContainerStyled>
  )
}

export default TabsSection
