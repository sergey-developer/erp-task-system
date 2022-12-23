import { Tabs } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import Spinner from 'components/Spinner'
import { TaskModel } from 'modules/task/models'

import TaskCardWrapper from '../TaskCard/TaskCardWrapper'
import { TaskCardTabsEnum, taskCardTabNamesDict } from './constants'
import DescriptionTab from './DescriptionTab'
import ResolutionTab from './ResolutionTab'
import { TabsStyled } from './styles'

const JournalTab = React.lazy(() => import('./JournalTab'))
const CommentListTab = React.lazy(() => import('./CommentListTab'))
const SubTaskListTab = React.lazy(() => import('./SubTaskListTab'))

const { TabPane } = Tabs

export type TaskCardTabsProps = {
  details: Pick<
    TaskModel,
    | 'id'
    | 'title'
    | 'description'
    | 'userResolution'
    | 'techResolution'
    | 'type'
    | 'status'
    | 'assignee'
    | 'recordId'
  >
}

const TaskCardTabs: FC<TaskCardTabsProps> = ({ details }) => {
  const breakpoints = useBreakpoint()

  return (
    <TabsStyled
      data-testid='task-card-tabs'
      $breakpoints={breakpoints}
      defaultActiveKey={TaskCardTabsEnum.Description}
      type='card'
      destroyInactiveTabPane //todo: написать тесты
    >
      <TabPane
        tab={taskCardTabNamesDict[TaskCardTabsEnum.Description]}
        key={TaskCardTabsEnum.Description}
      >
        <TaskCardWrapper>
          <DescriptionTab
            title={taskCardTabNamesDict[TaskCardTabsEnum.Description]}
            description={details.description}
          />
        </TaskCardWrapper>
      </TabPane>

      <TabPane
        tab={taskCardTabNamesDict[TaskCardTabsEnum.CommentList]}
        key={TaskCardTabsEnum.CommentList}
      >
        <TaskCardWrapper>
          <React.Suspense fallback={<Spinner />}>
            <CommentListTab
              title={taskCardTabNamesDict[TaskCardTabsEnum.CommentList]}
              taskId={details.id}
            />
          </React.Suspense>
        </TaskCardWrapper>
      </TabPane>

      <TabPane
        tab={taskCardTabNamesDict[TaskCardTabsEnum.Resolution]}
        key={TaskCardTabsEnum.Resolution}
      >
        <TaskCardWrapper>
          <ResolutionTab
            type={details.type}
            title={taskCardTabNamesDict[TaskCardTabsEnum.Resolution]}
            techResolution={details.techResolution}
            userResolution={details.userResolution}
          />
        </TaskCardWrapper>
      </TabPane>

      <TabPane
        tab={taskCardTabNamesDict[TaskCardTabsEnum.Journal]}
        key={TaskCardTabsEnum.Journal}
      >
        <TaskCardWrapper>
          <React.Suspense fallback={<Spinner />}>
            <JournalTab taskId={details.id} />
          </React.Suspense>
        </TaskCardWrapper>
      </TabPane>

      <TabPane
        tab={taskCardTabNamesDict[TaskCardTabsEnum.SubTaskList]}
        key={TaskCardTabsEnum.SubTaskList}
      >
        <TaskCardWrapper>
          <React.Suspense fallback={<Spinner />}>
            <SubTaskListTab task={details} />
          </React.Suspense>
        </TaskCardWrapper>
      </TabPane>
    </TabsStyled>
  )
}

export default TaskCardTabs
