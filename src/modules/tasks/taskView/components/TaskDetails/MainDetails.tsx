import { Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

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
  // TODO:
  //  const olaNextBreachTimeDiff = olaNextBreachTime
  //   ? moment(olaNextBreachTime).diff(moment(), 'hours')
  //   : ''
  //  console.log(olaNextBreachTimeDiff)
  return (
    <DetailContainerStyled>
      <Space direction='vertical' size='middle' $fullWidth>
        <Space
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
              до {formatDate(olaNextBreachTime, DATE_TIME_FORMAT)} (2ч)
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

          <Typography.Text>
            {formatDate(createdAt, DATE_TIME_FORMAT)}
          </Typography.Text>
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
