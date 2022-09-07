import { Tabs } from 'antd'
import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

import { TaskDetailsTabsEnum, taskDetailsTabNames } from './constants'
import Description from './Description'
import Resolution from './Resolution'
import TabWrapper from './TabWrapper'

const Journal = React.lazy(() => import('./Journal'))
const CommentList = React.lazy(() => import('./CommentList'))

const { TabPane } = Tabs

type TaskDetailsTabsProps = {
  details: Pick<
    TaskDetailsModel,
    'id' | 'description' | 'type' | 'userResolution' | 'techResolution'
  >
  defaultTab: TaskDetailsTabsEnum
}

const TaskDetailsTabs: FC<TaskDetailsTabsProps> = ({ details, defaultTab }) => {
  return (
    <Tabs defaultActiveKey={defaultTab} type='card'>
      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Description]}
        key={TaskDetailsTabsEnum.Description}
      >
        <TabWrapper>
          <Description
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Description]}
            description={details.description}
          />
        </TabWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Comments]}
        key={TaskDetailsTabsEnum.Comments}
      >
        <TabWrapper>
          <CommentList
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Comments]}
            taskId={details.id}
          />
        </TabWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
        key={TaskDetailsTabsEnum.Resolution}
      >
        <TabWrapper>
          <Resolution
            type={details.type}
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
            techResolution={details.techResolution}
            userResolution={details.userResolution}
          />
        </TabWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Journal]}
        key={TaskDetailsTabsEnum.Journal}
      >
        <TabWrapper>
          <Journal taskId={details.id} />
        </TabWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Tasks]}
        key={TaskDetailsTabsEnum.Tasks}
      >
        <TabWrapper>
          <span>Задания</span>
        </TabWrapper>
      </TabPane>
    </Tabs>
  )
}

export default TaskDetailsTabs
