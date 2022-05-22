import { Col, Row, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskDetailModel } from '../../models'
import { DetailContainerStyled } from './styles'

type MainDetailsProps = Pick<
  TaskDetailModel,
  'recordId' | 'title' | 'createdAt' | 'name' | 'address' | 'contactService'
>

const MainDetails: FC<MainDetailsProps> = ({
  recordId,
  title,
  createdAt,
  name,
  address,
  contactService,
}) => {
  return (
    <DetailContainerStyled>
      <Space direction='vertical' size='middle'>
        <Space
          size={4}
          split={<Typography.Text type='secondary'>•</Typography.Text>}
        >
          <Typography.Text type='secondary' ellipsis>
            {recordId}
          </Typography.Text>

          <Typography.Text type='danger'>
            до 17.11.2021, 18:00 (2ч)
          </Typography.Text>
        </Space>

        <Space direction='vertical' size={4}>
          <Typography.Title level={4} className='margin-b-0'>
            {title}
          </Typography.Title>

          <Typography.Text>{createdAt}</Typography.Text>
        </Space>

        <Row justify='space-between'>
          <Col span={12}>
            <Space direction='vertical'>
              <Typography.Text type='secondary'>Адрес</Typography.Text>

              <Typography.Text strong>{name}</Typography.Text>

              {address && <Typography.Text>{address}</Typography.Text>}
            </Space>
          </Col>

          <Col span={10}>
            <Space direction='vertical'>
              <Typography.Text type='secondary'>Заявитель</Typography.Text>

              <Typography.Text strong>{contactService}</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Space>
    </DetailContainerStyled>
  )
}

export default MainDetails
