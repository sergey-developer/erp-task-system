import { Tabs, Typography } from 'antd'
import React, { FC } from 'react'

import ImagesBlock from './ImagesBlock'
import { DetailContainerStyled } from './styles'

const { TabPane } = Tabs

const TabsSection: FC = () => {
  return (
    <DetailContainerStyled>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Описание и комментарии' key='1'>
          Описание и комментарии
        </TabPane>
        <TabPane tab='Решение' key='2'>
          <Typography.Title level={5}>Решение</Typography.Title>
          <Typography.Text type='secondary'>
            Техническое решение
          </Typography.Text>
          <Typography.Paragraph>
            Касса Вики Принт 57Ф, прошивка последняя. Через драйвер все работает
            — открытие/закрытие смены.
          </Typography.Paragraph>
          <Typography.Text type='secondary'>
            Решение для пользователя
          </Typography.Text>
          <Typography.Paragraph>
            Касса Вики Принт 57Ф, прошивка последняя. Через драйвер все работает
            — открытие/закрытие смены.
          </Typography.Paragraph>
          <ImagesBlock
            images={[
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            ]}
          />
        </TabPane>
        <TabPane tab='Задания' key='3'>
          Задания
        </TabPane>
      </Tabs>
    </DetailContainerStyled>
  )
}

export default TabsSection
