import { Col, Row, Typography } from 'antd'
import { BaseType as TypographyType } from 'antd/lib/typography/Base'
import moment from 'moment'
import React, { FC } from 'react'

import Space from 'components/Space'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { MaybeUndefined } from 'shared/interfaces/utils'
import formatDate from 'shared/utils/date/formatDate'

import { DetailContainerStyled } from '../styles'
import { getOlaNextBreachTimeAndCurrentMomentDiff } from './utils'

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
  const renderOlaNextBreachTime = () => {
    const currentMoment = moment()
    const olaNextBreachTimeMoment = moment(olaNextBreachTime)
    const isTaskOverdue = olaNextBreachTimeMoment.isBefore(currentMoment)

    const currentMomentAndCreatedAtDiff = currentMoment.diff(
      createdAt,
      'seconds',
    )

    const olaNextBreachTimeAndCreatedAtDiff = olaNextBreachTimeMoment.diff(
      createdAt,
      'seconds',
    )

    const olaNextBreachTimeAndCreatedAtHalfTime =
      olaNextBreachTimeAndCreatedAtDiff / 2

    const isTaskHalfTimeWasSpent = moment(
      currentMomentAndCreatedAtDiff,
    ).isBefore(olaNextBreachTimeAndCreatedAtHalfTime)

    const olaNextBreachTimeAndCurrentMomentDiff = isTaskHalfTimeWasSpent
      ? getOlaNextBreachTimeAndCurrentMomentDiff(
          olaNextBreachTimeMoment.diff(currentMoment),
        )
      : null

    const formattedOlaNextBreachTime = formatDate(
      olaNextBreachTime,
      DATE_TIME_FORMAT,
    )

    const olaNextBreachTimeTextType: MaybeUndefined<TypographyType> =
      isTaskOverdue ? 'danger' : isTaskHalfTimeWasSpent ? 'warning' : undefined

    const olaNextBreachTimeText = `до ${formattedOlaNextBreachTime}${
      olaNextBreachTimeAndCurrentMomentDiff
        ? ` (${olaNextBreachTimeAndCurrentMomentDiff})`
        : ''
    }`

    return (
      <Typography.Text type={olaNextBreachTimeTextType}>
        {olaNextBreachTimeText}
      </Typography.Text>
    )
  }

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

          {olaNextBreachTime && renderOlaNextBreachTime()}
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
