import { Col, Row, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import Space from 'components/Space'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import getOlaStatusMap from 'modules/task/utils/getOlaStatusMap'
import getOlaStatusTextType from 'modules/task/utils/getOlaStatusTextType'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'
import makeString from 'shared/utils/string/makeString'

import { DetailContainerStyled } from '../styles'
import { getTaskRemainingTime } from './utils'

type MainDetailsProps = Pick<
  TaskDetailsModel,
  | 'recordId'
  | 'title'
  | 'createdAt'
  | 'name'
  | 'address'
  | 'contactService'
  | 'olaStatus'
  | 'olaNextBreachTime'
  | 'olaEstimatedTime'
>

const MainDetails: FC<MainDetailsProps> = ({
  recordId,
  title,
  createdAt,
  name,
  address,
  contactService,
  olaStatus: rawOlaStatus,
  olaNextBreachTime: rawOlaNextBreachTime,
  olaEstimatedTime,
}) => {
  const olaNextBreachTime = useMemo(() => {
    const olaStatus = getOlaStatusMap(rawOlaStatus)

    const formattedOlaNextBreachTime = formatDate(
      rawOlaNextBreachTime,
      DATE_TIME_FORMAT,
    )

    const taskRemainingTime = olaStatus.isHalfExpired
      ? getTaskRemainingTime(olaEstimatedTime)
      : null

    const olaNextBreachTimeText = makeString(
      ' ',
      'до',
      formattedOlaNextBreachTime,
      taskRemainingTime,
    )

    const olaStatusTextType = getOlaStatusTextType(rawOlaStatus)

    return (
      <Typography.Text type={olaStatusTextType}>
        {olaNextBreachTimeText}
      </Typography.Text>
    )
  }, [olaEstimatedTime, rawOlaStatus, rawOlaNextBreachTime])

  return (
    <DetailContainerStyled>
      <Space direction='vertical' size='middle' $block>
        <Space
          split={
            rawOlaNextBreachTime ? (
              <Typography.Text type='secondary'>•</Typography.Text>
            ) : null
          }
        >
          <Typography.Text type='secondary' ellipsis className='break-text'>
            {recordId}
          </Typography.Text>

          {rawOlaNextBreachTime && olaNextBreachTime}
        </Space>

        <Space direction='vertical' size={4}>
          <Typography.Title level={4} ellipsis className='break-text mb-0'>
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
