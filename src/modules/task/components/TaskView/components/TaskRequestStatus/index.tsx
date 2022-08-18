import { QuestionCircleTwoTone } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { EllipsisConfig } from 'antd/es/typography/Base'
import React, { FC } from 'react'

import SeparatedText from 'components/SeparatedText'
import { BaseUserModel } from 'modules/user/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { WrapperStyled } from './styles'

const { Text, Title, Paragraph } = Typography

const commentEllipsisConfig: EllipsisConfig = { rows: 4, expandable: true }

type TaskRequestStatusProps = {
  user: Pick<BaseUserModel, 'firstName' | 'lastName' | 'middleName'>
  title: string
  createdAt: string
  comment: string
  actionText: string
  onAction: () => void
}

const TaskRequestStatus: FC<TaskRequestStatusProps> = ({
  user,
  title,
  comment,
  createdAt,
  actionText,
  onAction,
}) => {
  const breakpoints = useBreakpoint()

  return (
    <WrapperStyled $breakpoints={breakpoints}>
      <Space size='middle' align='baseline'>
        <QuestionCircleTwoTone className='fs-18' />

        <Space direction='vertical' size='middle'>
          <Space direction='vertical' size={4}>
            <Title level={5}>{title}</Title>

            <Paragraph ellipsis={commentEllipsisConfig}>{comment}</Paragraph>

            <SeparatedText>
              <Text type='secondary'>{getShortUserName(user)}</Text>

              <Text type='secondary'>
                {formatDate(createdAt, DATE_TIME_FORMAT)}
              </Text>
            </SeparatedText>
          </Space>

          <Button type='link' onClick={onAction}>
            {actionText}
          </Button>
        </Space>
      </Space>
    </WrapperStyled>
  )
}

export default TaskRequestStatus
