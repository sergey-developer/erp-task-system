import { Tabs } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/task/components/TaskView/models'

import { DetailContainerStyled } from '../styles'
import CommentList from './CommentList'
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
  const breakpoints = useBreakpoint()

  return (
    <DetailContainerStyled $breakpoints={breakpoints}>
      <Tabs defaultActiveKey={defaultTab}>
        <TabPane
          tab={taskDetailsTabNames[TaskDetailsTabsEnum.Description]}
          key={TaskDetailsTabsEnum.Description}
        >
          <Description
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Description]}
            description={details.description}
          />
        </TabPane>

        <TabPane
          tab={taskDetailsTabNames[TaskDetailsTabsEnum.Comments]}
          key={TaskDetailsTabsEnum.Comments}
        >
          <CommentList
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Comments]}
            taskId={details.id}
          />
        </TabPane>

        <TabPane
          tab={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
          key={TaskDetailsTabsEnum.Resolution}
        >
          <Resolution
            type={details.type}
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
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
