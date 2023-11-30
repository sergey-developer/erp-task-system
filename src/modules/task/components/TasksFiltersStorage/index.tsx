import { Space, Tag, Typography } from 'antd'
import isArray from 'lodash/isArray'
import size from 'lodash/size'
import { FC } from 'react'

import { tasksFiltersDict } from 'modules/task/constants/task'
import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'

const { Text } = Typography

export type TasksFilterStorageItem = {
  name: keyof TasksFiltersStorageType
  value: NonNullable<TasksFiltersStorageType[keyof TasksFiltersStorageType]>
}

type TasksFiltersStorageProps = {
  data: TasksFilterStorageItem[]
  onClose: (item: TasksFilterStorageItem) => void
}

const TasksFiltersStorage: FC<TasksFiltersStorageProps> = ({ data, onClose, ...props }) => {
  return (
    <Space>
      {data.map((item) => (
        <Tag {...props} key={item.name} closable onClose={() => onClose(item)}>
          <Space>
            <Text>{tasksFiltersDict[item.name]}</Text>

            {isArray(item.value) && <Text type='secondary'>{size(item.value)}</Text>}
          </Space>
        </Tag>
      ))}
    </Space>
  )
}

export default TasksFiltersStorage
