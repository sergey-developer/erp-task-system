import { Button, Space, Typography } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import { QuestionCircleIcon } from 'components/Icons'
import SeparatedText from 'components/Texts/SeparatedText'
import { BaseUserModel } from 'modules/user/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { commonEllipsisConfig } from 'shared/constants/text'
import formatDate from 'shared/utils/date/formatDate'

import { WrapperStyled } from './styles'

const { Text, Title, Paragraph } = Typography

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
        <QuestionCircleIcon $size='large' />

        <Space direction='vertical' size='middle'>
          <Space direction='vertical' size={4}>
            <Title level={5}>{title}</Title>

            <Paragraph ellipsis={commonEllipsisConfig}>{comment}</Paragraph>

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
