import { Tabs } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/task/components/TaskView/models'

import { DetailsContainerStyled } from '../styles'
import CommentList from './CommentList'
import { TaskDetailsTabsEnum, taskDetailsTabNames } from './constants'
import Description from './Description'
import Journal from './Journal'
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
    <Tabs defaultActiveKey={defaultTab} type='card'>
      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Description]}
        key={TaskDetailsTabsEnum.Description}
      >
        <DetailsContainerStyled $breakpoints={breakpoints}>
          <Description
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Description]}
            description={details.description}
          />
        </DetailsContainerStyled>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Comments]}
        key={TaskDetailsTabsEnum.Comments}
      >
        <DetailsContainerStyled $breakpoints={breakpoints}>
          <CommentList
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Comments]}
            taskId={details.id}
          />
        </DetailsContainerStyled>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
        key={TaskDetailsTabsEnum.Resolution}
      >
        <DetailsContainerStyled $breakpoints={breakpoints}>
          <Resolution
            type={details.type}
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
            techResolution={details.techResolution}
            userResolution={details.userResolution}
          />
        </DetailsContainerStyled>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Journal]}
        key={TaskDetailsTabsEnum.Journal}
      >
        <DetailsContainerStyled $breakpoints={breakpoints}>
          <Journal />
        </DetailsContainerStyled>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Tasks]}
        key={TaskDetailsTabsEnum.Tasks}
      >
        <DetailsContainerStyled $breakpoints={breakpoints}>
          <span>Задания</span>
        </DetailsContainerStyled>
      </TabPane>
    </Tabs>
  )
}

export default TaskDetailsTabs
