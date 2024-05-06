import { Col, Flex, Row, Typography } from 'antd'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'
import { mapInventorizationWarehousesTitles } from 'modules/warehouse/utils/inventorization'

import { formatDate } from 'shared/utils/date'

const { Text } = Typography

const ExecuteInventorizationPage: FC = () => {
  const location = useLocation()
  const inventorization = location.state as ExecuteInventorizationPageLocationState

  return (
    <div data-testid='execute-inventorization-page'>
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
    </div>
  )
}

export default ExecuteInventorizationPage
