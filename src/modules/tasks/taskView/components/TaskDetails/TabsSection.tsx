import { Tabs, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskTypeEnum } from 'modules/tasks/constants'

import { DetailContainerStyled } from './styles'

const { TabPane } = Tabs
export type TabsSectionProps = {
  techResolution?: string
  userResolution?: string
  type?: TaskTypeEnum
}
const TabsSection: FC<TabsSectionProps> = ({
  techResolution,
  userResolution,
  type,
}) => {
  return (
    <DetailContainerStyled>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Описание и комментарии' key='1'>
          Описание и комментарии
        </TabPane>
        <TabPane tab='Решение' key='2'>
          <Typography.Title level={5}>Решение</Typography.Title>
          {techResolution || userResolution ? (
            <>
              {techResolution && (
                <>
                  <Typography.Text type='secondary'>
                    Техническое решение
                  </Typography.Text>
                  <Typography.Paragraph>{techResolution}</Typography.Paragraph>
                </>
              )}
              {userResolution &&
                type !== TaskTypeEnum.Incident &&
                type !== TaskTypeEnum.Request && (
                  <>
                    <Typography.Text type='secondary'>
                      Решение для пользователя
                    </Typography.Text>
                    <Typography.Paragraph>
                      {userResolution}
                    </Typography.Paragraph>
                  </>
                )}
            </>
          ) : (
            '-'
          )}
        </TabPane>
        <TabPane tab='Задания' key='3'>
          Задания
        </TabPane>
      </Tabs>
    </DetailContainerStyled>
  )
}

export default TabsSection
