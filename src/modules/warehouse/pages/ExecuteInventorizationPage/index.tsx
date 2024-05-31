import { Button, Col, Flex, Row, Typography } from 'antd'
import React, { FC } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import ExecuteInventorizationReviseTab from 'modules/warehouse/components/ExecuteInventorizationReviseTab'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'
import {
  getInventorizationsPageLink,
  mapInventorizationWarehousesTitles,
} from 'modules/warehouse/utils/inventorization'

import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { TabsStyled } from './styles'

const { Text } = Typography

enum ExecuteInventorizationPageTabsEnum {
  Revise = 'Revise',
  Discrepancies = 'Discrepancies',
  Relocations = 'Relocations',
}

const ExecuteInventorizationPage: FC = () => {
  const params = useParams<'id'>()
  const location = useLocation()
  const navigate = useNavigate()
  const inventorization = location.state as ExecuteInventorizationPageLocationState
  const inventorizationId = Number(params.id!)

  const onReturnToInventorizationDetails = () => {
    navigate(getInventorizationsPageLink({ inventorizationId }))
  }

  return (
    <Flex data-testid='execute-inventorization-page' vertical gap='large'>
      <Row gutter={16}>
        <Col span={6}>
          <Flex vertical gap='small'>
            <Row>
              <Col span={9}>
                <Text type='secondary'>Тип:</Text>
              </Col>

              <Col span={15}>
                {valueOrHyphen(inventorization?.type, (value) => inventorizationTypeDict[value])}
              </Col>
            </Row>

            <Row>
              <Col span={9}>
                <Text type='secondary'>Статус:</Text>
              </Col>

              <Col span={15}>
                {valueOrHyphen(
                  inventorization?.status,
                  (value) => inventorizationStatusDict[value],
                )}
              </Col>
            </Row>

            <Row>
              <Col span={9}>
                <Text type='secondary'>Срок выполнения:</Text>
              </Col>

              <Col span={15}>
                {valueOrHyphen(inventorization?.deadlineAt, (value) => formatDate(value))}
              </Col>
            </Row>
          </Flex>
        </Col>

        <Col span={7}>
          <Flex vertical gap='small'>
            <Row>
              <Col span={6}>
                <Text type='secondary'>Создано:</Text>
              </Col>

              <Col span={18}>
                {valueOrHyphen(inventorization?.createdAt, (value) => formatDate(value))}
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <Text type='secondary'>Исполнитель:</Text>
              </Col>

              <Col span={18}>{valueOrHyphen(inventorization?.executor.fullName)}</Col>
            </Row>

            <Row>
              <Col span={6}>
                <Text type='secondary'>Автор:</Text>
              </Col>

              <Col span={18}>{valueOrHyphen(inventorization?.createdBy.fullName)}</Col>
            </Row>
          </Flex>
        </Col>

        <Col span={7}>
          <Flex vertical gap='small'>
            <Row>
              <Col span={6}>
                <Text type='secondary'>Склады:</Text>
              </Col>

              <Col span={18}>
                {valueOrHyphen(inventorization?.warehouses, (value) =>
                  mapInventorizationWarehousesTitles(value),
                )}
              </Col>
            </Row>
          </Flex>
        </Col>

        <Col span={4}>
          <Button onClick={onReturnToInventorizationDetails}>Вернуться в карточку</Button>
        </Col>
      </Row>

      <TabsStyled
        type='card'
        defaultActiveKey={ExecuteInventorizationPageTabsEnum.Revise}
        items={[
          {
            key: ExecuteInventorizationPageTabsEnum.Revise,
            label: 'Сверка',
            children: <ExecuteInventorizationReviseTab inventorizationId={inventorizationId} />,
          },
        ]}
      />
    </Flex>
  )
}

export default ExecuteInventorizationPage
