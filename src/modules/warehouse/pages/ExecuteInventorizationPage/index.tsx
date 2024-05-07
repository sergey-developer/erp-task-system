import { Col, Flex, Row, Typography } from 'antd'
import React, { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import ExecuteInventorizationReviseTab from 'modules/warehouse/components/ExecuteInventorizationReviseTab'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'
import { mapInventorizationWarehousesTitles } from 'modules/warehouse/utils/inventorization'

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
  const inventorization = location.state as ExecuteInventorizationPageLocationState
  const inventorizationId = Number(params.id!)

  return (
    <Flex data-testid='execute-inventorization-page' vertical gap='small'>
      <Row gutter={16}>
        {inventorization && (
          <Col span={6}>
            <Flex vertical gap='small'>
              <Row>
                <Col span={9}>
                  <Text type='secondary'>Тип:</Text>
                </Col>

                <Col span={15}>{inventorizationTypeDict[inventorization.type]}</Col>
              </Row>

              <Row>
                <Col span={9}>
                  <Text type='secondary'>Статус:</Text>
                </Col>

                <Col span={15}>{inventorizationStatusDict[inventorization.status]}</Col>
              </Row>

              <Row>
                <Col span={9}>
                  <Text type='secondary'>Срок выполнения:</Text>
                </Col>

                <Col span={15}>{formatDate(inventorization.deadlineAt)}</Col>
              </Row>
            </Flex>
          </Col>
        )}

        {inventorization && (
          <Col span={7}>
            <Flex vertical gap='small'>
              <Row>
                <Col span={6}>
                  <Text type='secondary'>Создано:</Text>
                </Col>

                <Col span={18}>{formatDate(inventorization.createdAt)}</Col>
              </Row>

              <Row>
                <Col span={6}>
                  <Text type='secondary'>Исполнитель:</Text>
                </Col>

                <Col span={18}>{inventorization.executor.fullName}</Col>
              </Row>

              <Row>
                <Col span={6}>
                  <Text type='secondary'>Автор:</Text>
                </Col>

                <Col span={18}>{inventorization.createdBy.fullName}</Col>
              </Row>
            </Flex>
          </Col>
        )}

        {inventorization && (
          <Col span={7}>
            <Flex vertical gap='small'>
              <Row>
                <Col span={6}>
                  <Text type='secondary'>Склады:</Text>
                </Col>

                <Col span={18}>
                  {mapInventorizationWarehousesTitles(inventorization.warehouses)}
                </Col>
              </Row>
            </Flex>
          </Col>
        )}
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
