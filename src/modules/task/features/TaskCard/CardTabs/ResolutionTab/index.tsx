import { PaperClipOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import { useTaskType } from 'modules/task/hooks'
import { TaskModel } from 'modules/task/models'

import LabeledData from 'components/LabeledData'

import { commonEllipsisConfig } from 'shared/constants/text'
import { prettyBytes } from 'shared/utils/file'
import { renderStringWithLineBreak } from 'shared/utils/string'

const { Title, Paragraph, Link, Text } = Typography

export type ResolutionTabProps = Pick<
  TaskModel,
  'techResolution' | 'userResolution' | 'type'
> & {
  title: string
  attachments: TaskModel['resolution']['attachments']
}

const ResolutionTab: FC<ResolutionTabProps> = ({
  type,
  title,
  userResolution,
  techResolution,
  attachments,
}) => {
  const taskType = useTaskType(type)

  return (
    <Space data-testid='task-resolution-tab' direction='vertical' size='large'>
      <Space direction='vertical'>
        <Title level={5}>{title}</Title>

        {!!attachments.length && (
          <Space direction='vertical'>
            {attachments.map((att, index) => (
              <Space>
                <Link key={index} download href={att.url}>
                  <Space>
                    <PaperClipOutlined />
                    {att.name}
                  </Space>
                </Link>

                <Text>({prettyBytes(att.size)})</Text>

                {!att.externalId && (
                  <Text type='secondary'>Не передано в Х5</Text>
                )}
              </Space>
            ))}
          </Space>
        )}
      </Space>

      {!!techResolution && (
        <LabeledData label='Техническое решение'>
          <Paragraph ellipsis={commonEllipsisConfig}>
            {renderStringWithLineBreak(techResolution)}
          </Paragraph>
        </LabeledData>
      )}

      {!!userResolution && !taskType.isIncidentTask && !taskType.isRequestTask && (
        <LabeledData label='Решение для пользователя'>
          <Paragraph ellipsis={commonEllipsisConfig}>
            {renderStringWithLineBreak(userResolution)}
          </Paragraph>
        </LabeledData>
      )}

      {!techResolution && !userResolution && '-'}
    </Space>
  )
}

export default ResolutionTab
