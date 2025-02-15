import { Space, Tag, Typography } from 'antd'
import isArray from 'lodash/isArray'
import size from 'lodash/size'
import { FC } from 'react'

import { tasksFiltersDict } from 'features/tasks/constants'
import { TasksFiltersStorageType } from 'features/tasks/services/taskLocalStorageService/taskLocalStorage.service'

const { Text } = Typography

export type TasksFilterStorageItem = {
  name: keyof TasksFiltersStorageType
  value: NonNullable<TasksFiltersStorageType[keyof TasksFiltersStorageType]>
}

type TasksFiltersStorageProps = {
  filters: TasksFilterStorageItem[]
  onClose: (filter: TasksFilterStorageItem) => void
}

const TasksFiltersStorage: FC<TasksFiltersStorageProps> = ({ filters, onClose }) => {
  return (
    <Space data-testid='tasks-filters-storage'>
      {filters.map((filter) => (
        <Tag
          data-testid={`tasks-filters-storage-${filter.name}`}
          key={filter.name}
          closable
          onClose={() => onClose(filter)}
        >
          <Space>
            <Text>{tasksFiltersDict[filter.name]}</Text>

            {isArray(filter.value) && <Text type='secondary'>{size(filter.value)}</Text>}
          </Space>
        </Tag>
      ))}
    </Space>
  )
}

export default TasksFiltersStorage
