import { Col, Row, Space, Typography } from 'antd'
import React, { FC } from 'react'

import ButtonText from 'components/Buttons/ButtonText'

import { DetailContainerStyled } from './styles'

const { Text } = Typography

const SecondaryDetail: FC = () => {
  return (
    <DetailContainerStyled>
      <Row justify='space-between'>
        <Col span={12}>
          <Space direction='vertical'>
            <Space size='large'>
              <Text type='secondary'>Рабочая группа</Text>

              <ButtonText type='link'>Перевести на II линию</ButtonText>
            </Space>

            <Text>РГ 1 Линия Поддержки</Text>
          </Space>
        </Col>

        <Col span={10}>
          <Space direction='vertical'>
            <Space size='large'>
              <Text type='secondary'>Исполнитель</Text>

              <ButtonText type='link'>Назначить на себя</ButtonText>
            </Space>

            <Text>Не назначен</Text>
          </Space>
        </Col>
      </Row>
    </DetailContainerStyled>
  )
}

export default SecondaryDetail
