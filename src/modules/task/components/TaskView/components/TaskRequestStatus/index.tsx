import { QuestionCircleTwoTone } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import React, { FC } from 'react'

import SeparatedText from 'components/SeparatedText'
import { BaseUserModel } from 'modules/user/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { WrapperStyled } from './styles'

const { Text, Title } = Typography

type TaskRequestStatusProps = {
  user: Pick<BaseUserModel, 'firstName' | 'lastName' | 'middleName'>
  title: string
  createdAt: Date
  description: string
  actionText: string
  onAction: () => void
}

const TaskRequestStatus: FC<TaskRequestStatusProps> = ({
  user,
  title,
  description,
  createdAt,
  actionText,
  onAction,
}) => {
  return (
    <WrapperStyled>
      <Space size='middle' align='baseline'>
        <QuestionCircleTwoTone className='fs-18' />

        <Space direction='vertical' size='middle'>
          <Space direction='vertical'>
            <Title level={5} className='mb-0'>
              {title}
            </Title>

            <Text>{description}</Text>

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
