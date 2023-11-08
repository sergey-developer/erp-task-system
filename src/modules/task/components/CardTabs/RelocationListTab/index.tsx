import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import RelocationList from 'modules/task/components/RelocationList'
import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'

import Space from 'components/Space'

const { Title } = Typography

type RelocationListTabProps = {}

const RelocationListTab: FC<RelocationListTabProps> = () => {
  const data = [
    {
      deadlineAt: new Date().toISOString(),
      status: RelocationTaskStatusEnum.New,
      relocateFrom: {
        id: 1,
        title: 'relocateFrom',
      },
      relocateTo: {
        id: 1,
        title: 'relocateTo',
      },
      documents: [
        {
          id: 1,
          size: 42393,
          url: 'url',
          name: 'name',
        },
      ],
      createdAt: new Date().toISOString(),
      executor: {
        fullName: 'Фулнейм Фулнеймов',
        phone: '+79804444444',
      },
    },
  ]

  return (
    <Space data-testid='relocation-list-tab' size='middle' direction='vertical' $block>
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>Перемещения</Title>
        </Col>

        <Col>
          <Button type='link'>Создать новое перемещение</Button>
        </Col>
      </Row>

      <RelocationList data={data} />
    </Space>
  )
}

export default RelocationListTab
