import { Tabs } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import { TaskModel } from 'modules/task/models'

import Spinner from 'components/Spinner'

import TaskCardWrapper from '../TaskCard/TaskCardWrapper'
import DescriptionTab from './DescriptionTab'
import ResolutionTab from './ResolutionTab'
import { TaskCardTabsEnum, taskCardTabNamesDict } from './constants'
import { TabsStyled } from './styles'

const JournalTab = React.lazy(() => import('./JournalTab'))
const CommentListTab = React.lazy(() => import('./CommentListTab'))
const SubTaskListTab = React.lazy(() => import('./SubTaskListTab'))

const { TabPane } = Tabs

export type CardTabsProps = {
  task: Pick<
    TaskModel,
    | 'id'
    | 'title'
    | 'description'
    | 'userResolution'
    | 'techResolution'
    | 'type'
    | 'status'
    | 'extendedStatus'
    | 'assignee'
    | 'recordId'
    | 'suspendRequest'
    | 'resolution'
    | 'attachments'
  >
}

const CardTabs: FC<CardTabsProps> = ({ task }) => {
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
            description={task.description}
            attachments={task.attachments}
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
              taskId={task.id}
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
            title={taskCardTabNamesDict[TaskCardTabsEnum.Resolution]}
            type={task.type}
            techResolution={task.techResolution}
            userResolution={task.userResolution}
            attachments={task.resolution.attachments}
          />
        </TaskCardWrapper>
      </TabPane>

      <TabPane tab={taskCardTabNamesDict[TaskCardTabsEnum.Journal]} key={TaskCardTabsEnum.Journal}>
        <TaskCardWrapper>
          <React.Suspense fallback={<Spinner />}>
            <JournalTab taskId={task.id} />
          </React.Suspense>
        </TaskCardWrapper>
      </TabPane>

      <TabPane
        tab={taskCardTabNamesDict[TaskCardTabsEnum.SubTaskList]}
        key={TaskCardTabsEnum.SubTaskList}
      >
        <TaskCardWrapper>
          <React.Suspense fallback={<Spinner />}>
            <SubTaskListTab task={task} />
          </React.Suspense>
        </TaskCardWrapper>
      </TabPane>
    </TabsStyled>
  )
}

export default CardTabs
