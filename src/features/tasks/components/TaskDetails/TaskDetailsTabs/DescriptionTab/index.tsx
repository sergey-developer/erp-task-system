import { Popover, Typography } from 'antd'
import Attachments from 'features/attachments/components/Attachments'
import { TaskDetailDTO } from 'features/tasks/api/dto'
import { MatchedUserPermissions } from 'features/users/types'
import React, { FC } from 'react'

import { EditIcon } from 'components/Icons'
import Space from 'components/Space'

import { renderStringWithLineBreak } from 'shared/utils/string'

import { TitleStyled } from './style'

const { Paragraph, Text } = Typography

export type DescriptionTabProps = Pick<
  TaskDetailDTO,
  'description' | 'attachments' | 'previousDescription' | 'isDescriptionChanged'
> & {
  title: string
  taskTitle: string
  permissions: MatchedUserPermissions
}

const DescriptionTab: FC<DescriptionTabProps> = ({
  title,
  taskTitle,
  description,
  previousDescription,
  isDescriptionChanged,
  attachments = [],
  permissions,
}) => {
  return (
    <Space data-testid='task-description-tab' $block direction='vertical'>
      <Space size='middle'>
        <TitleStyled level={5} copyable={{ text: `${taskTitle}\n\n${description}` }}>
          {title}
        </TitleStyled>

        {isDescriptionChanged && (
          <Popover
            title={<Text type='secondary'>Описание было изменено</Text>}
            content={
              (permissions.taskHistoryDescriptionRead ||
                permissions.taskHistoryDescriptionUpdate) &&
              previousDescription
            }
          >
            <EditIcon $color='royalOrange' $cursor='pointer' />
          </Popover>
        )}
      </Space>

      {description && <Paragraph>{renderStringWithLineBreak(description)}</Paragraph>}

      {!!attachments?.length && <Attachments data={attachments} />}
    </Space>
  )
}

export default DescriptionTab
