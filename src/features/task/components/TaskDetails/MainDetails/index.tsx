import { Col, Popover, Row, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import TaskStatus from 'features/task/components/TaskStatus'
import { badgeByTaskStatus, iconByTaskStatus } from 'features/task/components/TaskStatus/constants'
import { taskStatusDict } from 'features/task/constants/task'
import { TaskModel } from 'features/task/models'
import { getOlaStatusTextType } from 'features/task/utils/task'
import { UserPermissionsEnum } from 'features/user/api/constants'
import { useUserPermissions } from 'features/user/hooks'
import { getFullUserName } from 'features/user/utils'

import { FieldTimeIcon } from 'components/Icons'
import Label from 'components/Label'
import SeparatedText from 'components/SeparatedText'
import Space from 'components/Space'

import { RecordIdStyled } from './styles'
import { getTaskCompleteAtDate, parseResponseTime } from './utils'

const { Text, Title } = Typography

export type MainDetailsProps = Pick<
  TaskModel,
  | 'recordId'
  | 'title'
  | 'status'
  | 'createdAt'
  | 'createdBy'
  | 'name'
  | 'address'
  | 'contactService'
  | 'olaStatus'
  | 'olaNextBreachTime'
  | 'olaEstimatedTime'
  | 'contactPhone'
  | 'portablePhone'
  | 'responseTime'
  | 'workGroup'
  | 'assignee'
  | 'isOlaNextBreachTimeChanged'
  | 'previousOlaNextBreachTime'
>

const MainDetails: FC<MainDetailsProps> = ({
  recordId,
  status,
  title,
  createdAt,
  createdBy,
  name,
  address,
  contactService,
  contactPhone,
  portablePhone,
  olaStatus,
  olaNextBreachTime,
  olaEstimatedTime,
  responseTime: originResponseTime,
  workGroup,
  assignee,
  previousOlaNextBreachTime,
  isOlaNextBreachTimeChanged,
}) => {
  const permissions = useUserPermissions([
    UserPermissionsEnum.TaskHistoryDeadlineRead,
    UserPermissionsEnum.TaskHistoryDeadlineUpdate,
  ])

  const { olaStatusTextType, completeAt } = useMemo(
    () => ({
      olaStatusTextType: getOlaStatusTextType(olaStatus),
      completeAt: getTaskCompleteAtDate({
        olaStatus,
        olaEstimatedTime,
        olaNextBreachTime,
      }),
    }),
    [olaEstimatedTime, olaStatus, olaNextBreachTime],
  )

  const responseTime = useMemo(
    () => parseResponseTime(originResponseTime, workGroup),
    [originResponseTime, workGroup],
  )

  return (
    <Space data-testid='task-details-main-details' direction='vertical' size='middle' $block>
      <Space direction='vertical' $block>
        <SeparatedText>
          {recordId && (
            <RecordIdStyled type='secondary' ellipsis={{ tooltip: recordId }}>
              {recordId}
            </RecordIdStyled>
          )}

          <Space>
            {olaNextBreachTime && (
              <Space>
                <Text type={olaStatusTextType}>{completeAt}</Text>

                {isOlaNextBreachTimeChanged && (
                  <Popover
                    title={<Text type='secondary'>Срок выполнения был изменен</Text>}
                    content={
                      (permissions.taskHistoryDeadlineRead ||
                        permissions.taskHistoryDeadlineUpdate) &&
                      `Внешний срок выполнения: ${getTaskCompleteAtDate({
                        olaNextBreachTime: previousOlaNextBreachTime,
                      })}`
                    }
                  >
                    <FieldTimeIcon $color='royalOrange' />
                  </Popover>
                )}
              </Space>
            )}

            <TaskStatus
              status={status}
              text={taskStatusDict[status]}
              icon={iconByTaskStatus[status]}
              badge={badgeByTaskStatus[status]}
            />
          </Space>
        </SeparatedText>

        {responseTime ? (
          !!assignee ? null : (
            <Space>
              <Text>
                Срок реакции: <Text type={responseTime.type}>{responseTime.value}</Text>
              </Text>
            </Space>
          )
        ) : null}
      </Space>

      <Space direction='vertical' size={4} $block>
        <Title level={4} ellipsis title={title}>
          {title}
        </Title>

        <Text>{createdAt}</Text>
      </Space>

      <Row justify='space-between'>
        <Col span={11}>
          <Label label='Адрес'>
            <Text strong>{name}</Text>

            <Text>{address ? address : 'Не определено'}</Text>
          </Label>
        </Col>

        <Col span={11}>
          <Label label={createdBy ? 'Инициатор' : 'Заявитель'}>
            <Text strong>{createdBy ? getFullUserName(createdBy) : contactService}</Text>

            {createdBy ? (
              <Text>{createdBy.phone}</Text>
            ) : (
              <>
                {contactPhone && <Text>{contactPhone}</Text>}
                {portablePhone && <Text>{portablePhone}</Text>}
              </>
            )}
          </Label>
        </Col>
      </Row>
    </Space>
  )
}

export default MainDetails
