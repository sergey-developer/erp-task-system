import { Divider, Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { SubTaskModel } from 'modules/subTask/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import SubTask from './SubTask'

const { Text } = Typography

export type SubTaskListProps = {
  list: Array<SubTaskModel>
  isError: boolean
  onClickCancel?: (id: SubTaskModel['id']) => void
  onClickRework?: (id: SubTaskModel['id']) => void
}

const SubTaskList: FC<SubTaskListProps> = ({
  list,
  isError,
  onClickCancel,
  onClickRework,
}) => {
  return (
    <Space data-testid='sub-task-list' $block direction='vertical'>
      {list.length ? (
        <Space $block direction='vertical' size='large'>
          {list.map((item, index, array) => (
            <React.Fragment key={item.id}>
              <SubTask
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                recordId={item.recordId}
                olaNextBreachTime={formatDate(
                  item.olaNextBreachTime,
                  DATE_TIME_FORMAT,
                )}
                status={item.status}
                createdAt={formatDate(item.createdAt, DATE_TIME_FORMAT)}
                workGroupName={item.workGroup?.name || ''}
                externalAssigneeName={item.externalAssigneeName}
                externalAssigneePhone={item.externalAssigneePhone}
                techResolution={item.techResolution}
                onClickCancel={onClickCancel}
                onClickRework={onClickRework}
              />

              {array.length - 1 !== index && <Divider />}
            </React.Fragment>
          ))}
        </Space>
      ) : (
        <Text>{isError ? 'Не удалось получить задания' : 'Заданий нет'}</Text>
      )}
    </Space>
  )
}

export default SubTaskList
