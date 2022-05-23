import { Col, Row, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskDetailsModel } from '../../models'
import { DetailContainerStyled } from './styles'

type MainDetailsProps = Pick<
  TaskDetailsModel,
  | 'recordId'
  | 'title'
  | 'createdAt'
  | 'name'
  | 'address'
  | 'contactService'
  | 'olaNextBreachTime'
>

const MainDetails: FC<MainDetailsProps> = ({
  recordId,
  title,
  createdAt,
  name,
  address,
  contactService,
  olaNextBreachTime,
}) => {
  return (
    <DetailContainerStyled>
      <Space direction='vertical' size='middle'>
        <Space
          size='middle'
          split={
            olaNextBreachTime ? (
              <Typography.Text type='secondary'>•</Typography.Text>
            ) : null
          }
        >
          <Typography.Text type='secondary' ellipsis className='break-text'>
            {recordId}
          </Typography.Text>

          {olaNextBreachTime && (
            <Typography.Text type='danger'>
              до {olaNextBreachTime} (2ч)
            </Typography.Text>
          )}
        </Space>

        <Space direction='vertical' size={4}>
          <Typography.Title
            level={4}
            ellipsis
            className='break-text margin-b-0'
          >
            {title}
          </Typography.Title>

          <Typography.Text>{createdAt}</Typography.Text>
        </Space>

        <Row justify='space-between'>
          <Col span={12}>
            <Space direction='vertical'>
              <Typography.Text type='secondary'>Адрес</Typography.Text>

              <Typography.Text strong ellipsis className='break-text'>
                {name}
              </Typography.Text>

              {address && (
                <Typography.Text ellipsis className='break-text'>
                  {address}
                </Typography.Text>
              )}
            </Space>
          </Col>

          <Col span={10}>
            <Space direction='vertical'>
              <Typography.Text type='secondary'>Заявитель</Typography.Text>

              <Typography.Text strong ellipsis className='break-text'>
                {contactService}
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Space>
    </DetailContainerStyled>
  )
}

export default MainDetails
