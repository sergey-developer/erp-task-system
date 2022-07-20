import { Tabs } from 'antd'
import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/tasks/taskView/models'

import { DetailContainerStyled } from '../styles'
import Comments from './Comments'
import { TaskDetailsTabsEnum, taskDetailsTabNames } from './constants'
import Description from './Description'
import Resolution from './Resolution'

const { TabPane } = Tabs

export type TaskDetailsTabsProps = {
  details: Pick<
    TaskDetailsModel,
    'id' | 'description' | 'type' | 'userResolution' | 'techResolution'
  >
  defaultTab: TaskDetailsTabsEnum
}

const TaskDetailsTabs: FC<TaskDetailsTabsProps> = ({ details, defaultTab }) => {
  return (
    <DetailContainerStyled>
      <Tabs defaultActiveKey={defaultTab}>
        <TabPane
          tab={taskDetailsTabNames[TaskDetailsTabsEnum.Description]}
          key={TaskDetailsTabsEnum.Description}
        >
          <Description description={details.description} />
        </TabPane>

        <TabPane
          tab={taskDetailsTabNames[TaskDetailsTabsEnum.Comments]}
          key={TaskDetailsTabsEnum.Comments}
        >
          <Comments taskId={details.id} />
        </TabPane>

        <TabPane
          tab={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
          key={TaskDetailsTabsEnum.Resolution}
        >
          <Resolution
            type={details.type}
            techResolution={details.techResolution}
            userResolution={details.userResolution}
          />
        </TabPane>

        <TabPane
          tab={taskDetailsTabNames[TaskDetailsTabsEnum.Tasks]}
          key={TaskDetailsTabsEnum.Tasks}
        >
          Задания
        </TabPane>
      </Tabs>
    </DetailContainerStyled>
  )
}

export default TaskDetailsTabs
